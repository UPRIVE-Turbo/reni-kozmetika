import { Fragment } from 'react'
import Image from 'next/image'
import Reveal from './Reveal'

export type AboutData = {
  kicker?: string | null
  heading?: string | null
  headingHighlight?: string | null
  paragraphs?: { text: string }[] | null
  imageUrl?: string | null
  imageAlt?: string | null
  stats?: { value: string; label: string }[] | null
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'

const FALLBACK_PARAGRAPHS = [
  'Szenvedélyem az arcápolás és az a folyamat, ahogy a bőr megfelelő törődéssel visszanyeri természetes szépségét és ragyogását. Számomra a kozmetika nem csupán egy szakma, hanem hivatás: célom, hogy minden vendégem önbizalommal telve és kipihenten távozzon tőlem.',
  'Munkám során prémium minőségű, klinikailag igazolt hatóanyagokkal dolgozom. Folyamatosan képzem magam, hogy a legújabb bőrterápiás eljárásokat és technikákat alkalmazhassam a kezelések során, legyen szó problémás bőr kezeléséről vagy anti-aging terápiákról.',
]

const FALLBACK_STATS = [
  { value: '10+', label: 'Év tapasztalat' },
  { value: '100%', label: 'Szakértelem' },
]

export default function About({ data }: { data: AboutData }) {
  const paragraphs =
    data.paragraphs && data.paragraphs.length > 0
      ? data.paragraphs.map((p) => p.text)
      : FALLBACK_PARAGRAPHS

  const stats = data.stats && data.stats.length > 0 ? data.stats : FALLBACK_STATS

  return (
    <section id="bemutatkozas" className="py-24 relative bg-brand-cream-soft">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative w-full max-w-lg mx-auto lg:ml-0">
            <div className="aspect-3/4 w-full rounded-tr-[8rem] rounded-bl-[8rem] overflow-hidden shadow-2xl relative z-10 border-4 border-brand-cream group">
              <Image
                src={data.imageUrl || FALLBACK_IMAGE}
                alt={data.imageAlt || 'Mészárosné Rött Renáta, kozmetikus mosolyog'}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-full h-full bg-brand-pink/40 rounded-tr-[8rem] rounded-bl-[8rem] -z-10 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2" />
          </Reveal>

          <Reveal delay={200} className="lg:pl-10">
            <h4 className="text-brand-burgundy font-semibold tracking-widest uppercase text-sm mb-4">
              {data.kicker || 'Üdvözlöm,'}
            </h4>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-brown mb-8 leading-tight">
              {data.heading || 'Mészárosné Rött Renáta'} <br />
              <span className="italic text-brand-burgundy font-light">
                {data.headingHighlight || 'vagyok.'}
              </span>
            </h2>

            <div className="space-y-6 text-brand-brown/80 font-light text-lg leading-relaxed">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <div className="mt-12 flex items-center gap-6 border-t border-brand-brown/10 pt-8">
                {stats.map((stat, i) => (
                  <Fragment key={`stat-${i}`}>
                    {i > 0 && <div className="w-px h-12 bg-brand-brown/20" />}
                    <div>
                      <p className="font-serif text-3xl text-brand-burgundy">{stat.value}</p>
                      <p className="text-xs uppercase tracking-wider text-brand-brown/60 mt-1 font-semibold">
                        {stat.label}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
