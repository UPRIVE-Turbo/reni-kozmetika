import Image from 'next/image'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] pt-24 pb-12 flex flex-col justify-center overflow-hidden border-b border-brand-burgundy/10">
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-brand-pink/20 blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full relative z-10">
        <Reveal className="lg:col-span-5 flex flex-col items-start pt-12 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-pink/30 text-brand-burgundy text-xs font-semibold tracking-widest uppercase rounded-full mb-8">
            <i className="ph-fill ph-sparkle" /> Győr, Adyváros
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-brand-burgundy mb-6">
            Ahol a <br /> <span className="italic text-brand-brown">szépség</span> és <br />{' '}
            <span className="text-brand-pink relative whitespace-nowrap">
              <span className="relative z-10 text-brand-burgundy italic">önbizalom</span>
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-brand-pink"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.0003 6.99954C28.2435 2.50293 84.1485 -1.97968 198.502 6.99954"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br /> találkozik.
          </h1>

          <p className="text-lg md:text-xl text-brand-brown/80 mb-10 max-w-[400px] leading-relaxed font-light">
            Személyre szabott arcápolás és professzionális kozmetikai kezelések egy nyugodt,
            nőies környezetben, Győr szívében.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#foglalas"
              className="bg-brand-burgundy text-brand-cream px-8 py-4 rounded-full text-center hover:bg-brand-brown transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium flex items-center justify-center gap-2 group"
            >
              Időpontot foglalok
              <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#szolgaltatasok"
              className="bg-transparent border border-brand-burgundy/20 text-brand-burgundy px-8 py-4 rounded-full text-center hover:bg-brand-burgundy/5 transition-all duration-300 font-medium"
            >
              Kezelések
            </a>
          </div>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-7 h-[50vh] lg:h-[80vh] w-full relative">
          <div className="w-full h-full arch-mask overflow-hidden relative shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80"
              alt="Hölgy arcápolási kezelés közben egy nyugodt szalon környezetben"
              fill
              priority
              className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-brand-burgundy/10 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="absolute bottom-10 -left-10 md:left-[-5%] bg-white/90 backdrop-blur-md p-5 rounded-2xl soft-shadow flex items-center gap-4 animate-bounce [animation-duration:3s]">
            <div className="w-12 h-12 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-burgundy text-2xl">
              <i className="ph-fill ph-star" />
            </div>
            <div>
              <p className="text-xs text-brand-brown/60 uppercase font-semibold tracking-wider">
                Értékelés
              </p>
              <p className="font-serif font-medium text-lg text-brand-burgundy">
                5.0 / 5.0 Kiváló
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
