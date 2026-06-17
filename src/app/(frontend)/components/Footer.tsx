export type FooterSettings = {
  facebook?: string | null
  instagram?: string | null
  branding?: {
    namePrimary?: string | null
    nameSecondary?: string | null
  } | null
  footer?: {
    copyrightText?: string | null
  } | null
}

export default function Footer({ settings }: { settings: FooterSettings }) {
  return (
    <footer className="bg-brand-brown text-brand-cream/60 py-12 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 group cursor-default">
          <span className="font-serif text-xl font-medium text-brand-cream transition-colors group-hover:text-brand-pink">
            {settings.branding?.namePrimary || 'RENI'}
          </span>
          <span className="text-xs font-sans tracking-widest uppercase mt-1">
            {settings.branding?.nameSecondary || 'Kozmetika'}
          </span>
        </div>

        <div className="flex gap-6 text-sm">
          {settings.facebook && (
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-pink transition-colors hover:-translate-y-0.5 inline-block"
            >
              Facebook
            </a>
          )}
          {settings.instagram && (
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-pink transition-colors hover:-translate-y-0.5 inline-block"
            >
              Instagram
            </a>
          )}
        </div>

        <div className="text-xs font-light tracking-wide text-center md:text-right">
          {settings.footer?.copyrightText || '© 2026 Mészárosné Rött Renáta. Minden jog fenntartva.'}
        </div>
      </div>
    </footer>
  )
}
