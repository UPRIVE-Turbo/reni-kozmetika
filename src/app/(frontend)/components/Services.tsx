import Reveal from './Reveal'

export type ServiceItem = {
  id: string | number
  name: string
  description?: string | null
  price?: string | null
}

export type ServicesSectionContent = {
  heading?: string | null
  headingHighlight?: string | null
  description?: string | null
  footnote?: string | null
}

const delays = [0, 100, 200, 300] as const

export default function Services({
  services,
  content,
}: {
  services: ServiceItem[]
  content?: ServicesSectionContent
}) {
  return (
    <section id="szolgaltatasok" className="py-24 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-24 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-burgundy tracking-tight leading-none mb-6">
              {content?.heading || 'Személyre Szabott'}
              <br />{' '}
              <span className="italic font-light">{content?.headingHighlight || 'Kezelések'}</span>
            </h2>
            <p className="text-brand-brown/70 text-lg max-w-lg font-light leading-relaxed">
              {content?.description ||
                'Minden arcbőr más törődést igényel. Szolgáltatásaim fókuszában az egészséges, ragyogó bőr elérése áll, prémium hatóanyagokkal.'}
            </p>
          </div>
          <div className="hidden md:block">
            <i className="ph-thin ph-flower-lotus text-6xl text-brand-pink" />
          </div>
        </Reveal>

        <div className="border-t border-brand-brown/10">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={delays[index % delays.length]}>
              <div className="service-row group py-8 border-b border-brand-brown/10 cursor-pointer">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                  <div className="md:col-span-5 flex items-center gap-4">
                    <span className="service-arrow text-brand-burgundy text-xl">
                      <i className="ph-bold ph-arrow-right" />
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl text-brand-brown group-hover:text-brand-burgundy transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <div className="md:col-span-5 text-brand-brown/70 font-light text-base md:text-lg">
                    {service.description}
                  </div>
                  {service.price && (
                    <div className="md:col-span-2 md:text-right">
                      <span className="inline-block border border-brand-pink text-brand-burgundy rounded-full px-4 py-1 text-sm bg-brand-cream">
                        {service.price}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-12 text-center">
          <p className="text-brand-brown/60 text-sm italic">
            {content?.footnote ||
              'Minden kezelést alapos bőrdiagnosztika előz meg. A teljes árlista a szalonban tekinthető meg.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
