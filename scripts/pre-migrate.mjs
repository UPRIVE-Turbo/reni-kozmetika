/**
 * Handles the transition from Payload's push mode (local dev) to migrations (production).
 * When run against a push-mode DB, marks all migration files as already applied
 * so `payload migrate` skips re-running the CREATE TABLE statements on existing tables.
 * On a fresh production DB, this is a no-op.
 */
import { readdir } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// Load .env files for local runs (Vercel injects vars directly into the environment)
try {
  const dotenv = require('dotenv')
  dotenv.config({ path: path.join(__dirname, '..', '.env.local') })
  dotenv.config({ path: path.join(__dirname, '..', '.env') })
} catch {}

const connString = process.env.DATABASE_URL || process.env.DATABASE_URI
if (!connString) {
  console.log('[pre-migrate] No DATABASE_URL — skipping.')
  process.exit(0)
}

const { default: pg } = await import('pg')
const client = new pg.Client({ connectionString: connString })

try {
  await client.connect()

  // On a fresh DB the table doesn't exist yet — nothing to do
  const { rows: tableCheck } = await client.query(`
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'payload_migrations'
    LIMIT 1
  `)
  if (tableCheck.length === 0) {
    console.log('[pre-migrate] Fresh DB — payload migrate will handle schema creation.')
    process.exit(0)
  }

  // Check for push-mode entries (batch = -1 means `push` was used)
  const { rows: pushEntries } = await client.query(
    'SELECT id FROM payload_migrations WHERE batch = -1 LIMIT 1'
  )
  if (pushEntries.length === 0) {
    console.log('[pre-migrate] No push-mode entries — nothing to do.')
    process.exit(0)
  }

  console.log('[pre-migrate] Push-mode DB detected. Marking existing migrations as applied...')

  const migrationsDir = path.join(__dirname, '..', 'src', 'migrations')
  let migrationNames = []
  try {
    migrationNames = (await readdir(migrationsDir))
      .filter((f) => /^\d/.test(f) && f.endsWith('.ts'))
      .sort()
      .map((f) => f.replace('.ts', ''))
  } catch {
    console.log('[pre-migrate] No migration files found.')
  }

  await client.query('BEGIN')
  await client.query('DELETE FROM payload_migrations WHERE batch = -1')
  for (const name of migrationNames) {
    const { rows: existing } = await client.query(
      'SELECT id FROM payload_migrations WHERE name = $1',
      [name]
    )
    if (existing.length === 0) {
      await client.query(
        `INSERT INTO payload_migrations (name, batch, updated_at, created_at)
         VALUES ($1, 1, NOW(), NOW())`,
        [name]
      )
      console.log('[pre-migrate]  Marked as applied:', name)
    }
  }
  await client.query('COMMIT')
  console.log('[pre-migrate] Done.')
} catch (err) {
  try { await client.query('ROLLBACK') } catch {}
  console.error('[pre-migrate] Error:', err.message)
  process.exit(1)
} finally {
  await client.end()
}
