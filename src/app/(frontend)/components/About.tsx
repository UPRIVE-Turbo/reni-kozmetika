import Image from 'next/image'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="bemutatkozas" className="py-24 relative bg-brand-cream-soft">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative w-full max-w-lg mx-auto lg:ml-0">
            <div className="aspect-3/4 w-full rounded-tr-[8rem] rounded-bl-[8rem] overflow-hidden shadow-2xl relative z-10 border-4 border-brand-cream">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Mészárosné Rött Renáta, kozmetikus mosolyog"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-full h-full bg-brand-pink/40 rounded-tr-[8rem] rounded-bl-[8rem] -z-10" />
          </Reveal>

          <Reveal delay={200} className="lg:pl-10">
            <h4 className="text-brand-burgundy font-semibold tracking-widest uppercase text-sm mb-4">
              Üdvözlöm,
            </h4>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-brown mb-8 leading-tight">
              Mészárosné Rött Renáta <br />
              <span className="italic text-brand-burgundy font-light">vagyok.</span>
            </h2>

            <div className="space-y-6 text-brand-brown/80 font-light text-lg leading-relaxed">
              <p>
                Szenvedélyem az arcápolás és az a folyamat, ahogy a bőr megfelelő törődéssel
                visszanyeri természetes szépségét és ragyogását. Számomra a kozmetika nem
                csupán egy szakma, hanem hivatás: célom, hogy minden vendégem önbizalommal
                telve és kipihenten távozzon tőlem.
              </p>
              <p>
                Munkám során prémium minőségű, klinikailag igazolt hatóanyagokkal dolgozom.
                Folyamatosan képzem magam, hogy a legújabb bőrterápiás eljárásokat és
                technikákat alkalmazhassam a kezelések során, legyen szó problémás bőr
                kezeléséről vagy anti-aging terápiákról.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-brand-brown/10 pt-8">
              <div>
                <p className="font-serif text-3xl text-brand-burgundy">10+</p>
                <p className="text-xs uppercase tracking-wider text-brand-brown/60 mt-1 font-semibold">
                  Év tapasztalat
                </p>
              </div>
              <div className="w-px h-12 bg-brand-brown/20" />
              <div>
                <p className="font-serif text-3xl text-brand-burgundy">100%</p>
                <p className="text-xs uppercase tracking-wider text-brand-brown/60 mt-1 font-semibold">
                  Szakértelem
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
