'use client'

import { useState, useTransition } from 'react'
import { submitBooking } from '../actions'
import type { ServiceItem } from './Services'

export default function BookingForm({ services }: { services: ServiceItem[] }) {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result = await submitBooking(formData)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Hiba történt. Kérjük, próbálja újra.')
      }
    })
  }

  if (success) {
    return (
      <div className="animate-pop-in flex flex-col items-center justify-center p-6 bg-white/10 rounded-md border border-white/20 text-center">
        <i className="ph-fill ph-check-circle text-4xl text-brand-pink mb-2" />
        <h4 className="font-serif text-xl mb-1">Köszönöm a megkeresést!</h4>
        <p className="font-light text-sm text-brand-cream/80">
          Hamarosan keresni fogom a megadott telefonszámon.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="relative group">
        <input
          type="text"
          id="name"
          name="name"
          required
          className="input-elegant peer"
          placeholder=" "
        />
        <label
          htmlFor="name"
          className="absolute left-0 top-3 text-brand-cream/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Név
        </label>
      </div>

      <div className="relative group">
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="input-elegant peer"
          placeholder=" "
        />
        <label
          htmlFor="phone"
          className="absolute left-0 top-3 text-brand-cream/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Telefonszám (pl. +36 30 123 4567)
        </label>
      </div>

      <div className="relative group">
        <input
          type="email"
          id="email"
          name="email"
          className="input-elegant peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute left-0 top-3 text-brand-cream/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Email cím (opcionális)
        </label>
      </div>

      <div className="relative group">
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className="input-elegant peer appearance-none bg-transparent"
        >
          <option value="" disabled className="text-brand-brown">
            Válasszon szolgáltatást...
          </option>
          {services.map((service) => (
            <option key={service.id} value={service.name} className="text-brand-brown">
              {service.name}
            </option>
          ))}
        </select>
        <div className="absolute right-0 top-3 pointer-events-none text-brand-cream/50">
          <i className="ph-bold ph-caret-down" />
        </div>
      </div>

      <div className="relative group">
        <input
          type="text"
          id="preferredDate"
          name="preferredDate"
          className="input-elegant peer"
          placeholder=" "
        />
        <label
          htmlFor="preferredDate"
          className="absolute left-0 top-3 text-brand-cream/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Melyik nap/napszak lenne megfelelő?
        </label>
      </div>

      <div className="relative group">
        <textarea
          id="message"
          name="message"
          rows={3}
          className="input-elegant peer resize-none"
          placeholder=" "
        />
        <label
          htmlFor="message"
          className="absolute left-0 top-3 text-brand-cream/50 transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-brand-pink peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Egyéb üzenet, kérdés (opcionális)
        </label>
      </div>

      {error && <p className="text-sm text-brand-pink">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-brand-pink text-brand-burgundy font-medium py-4 rounded-md hover:bg-white hover:shadow-lg transition-all duration-300 active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-80"
      >
        <span>{isPending ? 'Küldés folyamatban...' : 'Küldés'}</span>
        {isPending ? (
          <i className="ph-bold ph-spinner animate-spin text-xl" />
        ) : (
          <i className="ph-bold ph-paper-plane-right" />
        )}
      </button>
    </form>
  )
}
