import Reveal from './Reveal'
import BookingForm from './BookingForm'
import type { ServiceItem } from './Services'

export type SettingsData = {
  phone: string
  email: string
  address: string
  openingHours?: string | null
  mapEmbedUrl?: string | null
}

export type ContactSectionContent = {
  heading?: string | null
  headingHighlight?: string | null
  description?: string | null
  availabilityHeading?: string | null
}

export default function BookingContact({
  settings,
  services,
  content,
}: {
  settings: SettingsData
  services: ServiceItem[]
  content?: ContactSectionContent
}) {
  const telLink = `tel:${settings.phone.replace(/\s/g, '')}`

  return (
    <section id="foglalas" className="bg-brand-burgundy text-brand-cream relative">
      <svg
        className="absolute top-0 w-full h-[6vw] fill-brand-cream -translate-y-[99%]"
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,50 C320,150 420,-50 1440,50 L1440,100 L0,100 Z" />
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <Reveal>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">
              {content?.heading || 'Ideje a'}{' '}
              <span className="italic font-light text-brand-pink">
                {content?.headingHighlight || 'megújulásnak'}
              </span>
            </h2>
            <p className="text-brand-cream/70 font-light mb-12">
              {content?.description ||
                'Adja meg adatait, és hamarosan felveszem Önnel a kapcsolatot a pontos időpont egyeztetése céljából.'}
            </p>

            <BookingForm services={services} />
          </Reveal>

          <Reveal delay={200} className="flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-3">
                <i className="ph-thin ph-map-pin text-brand-pink text-3xl" />{' '}
                {content?.availabilityHeading || 'Elérhetőség'}
              </h3>

              <div className="space-y-6 font-light">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-brand-cream/10 flex-shrink-0 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-burgundy transition-colors">
                    <i className="ph-fill ph-phone-call text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-cream/50 font-semibold mb-1">
                      Telefon
                    </p>
                    <a href={telLink} className="text-xl hover:text-brand-pink transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-brand-cream/10 flex-shrink-0 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-burgundy transition-colors">
                    <i className="ph-fill ph-envelope-simple text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-cream/50 font-semibold mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-lg hover:text-brand-pink transition-colors"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-brand-cream/10 flex-shrink-0 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-burgundy transition-colors">
                    <i className="ph-fill ph-map-trifold text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-cream/50 font-semibold mb-1">
                      Cím
                    </p>
                    <p className="text-lg">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-brand-cream/10 flex-shrink-0 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-brand-burgundy transition-colors">
                    <i className="ph-fill ph-clock text-xl" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-cream/50 font-semibold mb-1">
                      Nyitvatartás
                    </p>
                    <p className="text-lg whitespace-pre-line">{settings.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {settings.mapEmbedUrl && (
              <div className="mt-12 w-full h-48 rounded-xl overflow-hidden border border-brand-cream/10">
                <iframe
                  src={settings.mapEmbedUrl}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RENI Kozmetika térkép"
                />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
