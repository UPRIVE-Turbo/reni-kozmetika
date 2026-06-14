import Image from 'next/image'
import Reveal from './Reveal'

const fallbackImages = [
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    alt: 'Elegáns kozmetikai szalon belső tér',
    caption: 'Nyugodt környezet',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    alt: 'Prémium kozmetikai krémek és ecsetek',
    className: 'col-span-2 md:col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80',
    alt: 'Relaxáló arcmasszázs és törölközők',
    className: 'col-span-2 md:col-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80',
    alt: 'Női arcbőr közelről, frissesség',
    className: 'col-span-2',
  },
]

export type GalleryImage = {
  id: string | number
  url: string
  alt: string
}

export default function Gallery({ images }: { images?: GalleryImage[] }) {
  const items =
    images && images.length > 0
      ? images.map((img, i) => ({
          src: img.url,
          alt: img.alt,
          caption: i === 0 ? 'Nyugodt környezet' : undefined,
          className:
            i === 0
              ? 'col-span-2 row-span-2'
              : i === 3
                ? 'col-span-2'
                : 'col-span-2 md:col-span-1',
        }))
      : fallbackImages

  return (
    <section id="galeria" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-burgundy tracking-tight leading-none mb-4">
            A Lenyugvás <span className="italic font-light">Szigete</span>
          </h2>
          <p className="text-brand-brown/70 flex justify-center items-center gap-2">
            Pillantson be a szalon hangulatába <i className="ph-fill ph-drop text-brand-pink" />
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {items.map((item, index) => (
            <Reveal
              key={index}
              delay={(index % 4) * 100 as 0 | 100 | 200 | 300}
              className={`${item.className} rounded-2xl overflow-hidden group relative h-full`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-brand-cream font-serif text-xl">{item.caption}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
