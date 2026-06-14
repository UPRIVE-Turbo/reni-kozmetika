'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export type BookingFormResult = {
  success: boolean
  error?: string
}

export async function submitBooking(formData: FormData): Promise<BookingFormResult> {
  const name = String(formData.get('name') || '').trim()
  const phone = String(formData.get('phone') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const service = String(formData.get('service') || '').trim()
  const preferredDate = String(formData.get('preferredDate') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !phone) {
    return { success: false, error: 'A név és a telefonszám megadása kötelező.' }
  }

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    await payload.create({
      collection: 'submissions',
      data: {
        name,
        phone,
        email: email || undefined,
        service: service || undefined,
        preferredDate: preferredDate || undefined,
        message: message || undefined,
      },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Hiba történt a küldés során. Kérjük, próbálja újra.' }
  }
}
