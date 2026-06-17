import { getPayload } from 'payload'
import config from './payload.config'

const RESET_IMAGES = process.argv.includes('--reset-images')

type ImageDef = {
  url: string
  filename: string
  alt: string
}

const HERO_IMAGE: ImageDef = {
  url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80',
  filename: 'hero-arcapolas-kezeles.jpg',
  alt: 'Hölgy arcápolási kezelés közben egy nyugodt szalon környezetben',
}

const ABOUT_IMAGE: ImageDef = {
  url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80',
  filename: 'about-kozmetikus-renata.jpg',
  alt: 'Mészárosné Rött Renáta, kozmetikus mosolyog',
}

const GALLERY_IMAGES: ImageDef[] = [
  {
    url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    filename: 'gallery-szalon-belso.jpg',
    alt: 'A szalon belső tere — nyugodt, nőies környezet',
  },
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80',
    filename: 'gallery-borgyogy-termekek.jpg',
    alt: 'Prémium bőrápoló termékek a szalonban',
  },
  {
    url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
    filename: 'gallery-arcapolas-kezeles.jpg',
    alt: 'Arcápolási kezelés közben — professzionális gondoskodás',
  },
  {
    url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
    filename: 'gallery-szepseg-kezeles.jpg',
    alt: 'Szépségkezelés a szalonban',
  },
  {
    url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80',
    filename: 'gallery-relaxacio.jpg',
    alt: 'Relaxáló légkör a RENI Kozmetikában',
  },
]

const SERVICES = [
  {
    name: 'Klasszikus Arctisztítás',
    description:
      'Mélytisztítás, gőzölés, mitesszerek eltávolítása és nyugtató maszk a tiszta arcbőrért.',
    price: 'kb. 90 perc',
    icon: 'sparkle',
  },
  {
    name: 'Kémiai Peeling',
    description:
      'Bőrmegújító savas hámlasztás pigmentfoltok, finom ráncok és akné hegek halványítására.',
    price: 'kb. 45 perc',
    icon: 'drop',
  },
  {
    name: 'Relaxáló Arcmasszázs',
    description:
      'Feszültségoldó, izomlazító mozdulatok értékes növényi olajokkal az arc, nyak és dekoltázs területén.',
    price: 'kb. 30 perc',
    icon: 'flower-lotus',
  },
  {
    name: 'Szempilla & Szemöldök',
    description: 'Szemöldökszedés, tartós festés és laminálás a tekintet tökéletes kiemeléséért.',
    price: 'kb. 15–45 perc',
    icon: 'eye',
  },
]

async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Kép letöltése sikertelen: ${url} (HTTP ${res.status})`)
  return Buffer.from(await res.arrayBuffer())
}

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  image: ImageDef,
): Promise<number> {
  const buffer = await downloadImage(image.url)
  const doc = await payload.create({
    collection: 'media',
    data: { alt: image.alt },
    file: {
      data: buffer,
      name: image.filename,
      mimetype: 'image/jpeg',
      size: buffer.length,
    },
  })
  return doc.id as number
}

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  try {
    // 1. Settings global
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        companyName: 'RENI Kozmetika',
        phone: '+36 30 964 8446',
        email: 'meszarosnerottrenata@gmail.com',
        address: 'Ifjúság körút 83, 9023 Győr, Adyváros',
        openingHours: 'Kizárólag előzetes bejelentkezés alapján.',
        instagram: 'https://www.instagram.com/reni.kozmetika',
        mapEmbedUrl:
          'https://www.google.com/maps?q=Ifj%C3%BAs%C3%A1g+k%C3%B6r%C3%BAt+83%2C+Gy%C5%91r&output=embed',
        branding: {
          namePrimary: 'RENI',
          nameSecondary: 'Kozmetika',
        },
        navigation: {
          links: [
            { label: 'Szolgáltatások', href: '#szolgaltatasok' },
            { label: 'Rólam', href: '#bemutatkozas' },
            { label: 'Galéria', href: '#galeria' },
          ],
          ctaLabel: 'Időpontfoglalás',
          mobileCtaLabel: 'Időpontot kérek',
        },
        footer: {
          copyrightText: '© 2026 Mészárosné Rött Renáta. Minden jog fenntartva.',
        },
        seo: {
          metaTitle: 'RENI Kozmetika | Szépség és Önbizalom | Győr, Adyváros',
          metaDescription:
            'Professzionális kozmetikai kezelések, arcápolás Győrben, Adyvárosban. Foglaljon időpontot Mészárosné Rött Renátához.',
        },
      },
    })
    console.log('✓ Settings frissítve.')

    // 2. Képek — törlés reset esetén
    if (RESET_IMAGES) {
      const existingGallery = await payload.find({ collection: 'gallery', limit: 200 })
      for (const doc of existingGallery.docs) {
        await payload.delete({ collection: 'gallery', id: doc.id })
      }
      if (existingGallery.docs.length > 0) {
        console.log(`✓ ${existingGallery.docs.length} galéria bejegyzés törölve.`)
      }

      const pageContent = await payload.findGlobal({ slug: 'page-content' })
      const heroRef = pageContent?.hero?.image
      const aboutRef = pageContent?.about?.image
      for (const ref of [heroRef, aboutRef]) {
        if (!ref) continue
        const id = typeof ref === 'object' ? (ref as { id: number }).id : (ref as number)
        if (id) {
          try {
            await payload.delete({ collection: 'media', id })
          } catch {
            // fájl nem létezik, kihagyva
          }
        }
      }
      console.log('✓ Korábbi hero/about képek törölve.')
    }

    // 3. Hero kép feltöltése
    let heroImageId: number | null = null
    if (!RESET_IMAGES) {
      const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: HERO_IMAGE.alt } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        heroImageId = existing.docs[0].id as number
        console.log('✓ Hero kép már létezik, kihagyva.')
      }
    }
    if (heroImageId === null) {
      heroImageId = await uploadMedia(payload, HERO_IMAGE)
      console.log('✓ Hero kép feltöltve.')
    }

    // 4. Bemutatkozás kép feltöltése
    let aboutImageId: number | null = null
    if (!RESET_IMAGES) {
      const existing = await payload.find({
        collection: 'media',
        where: { alt: { equals: ABOUT_IMAGE.alt } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        aboutImageId = existing.docs[0].id as number
        console.log('✓ Bemutatkozás kép már létezik, kihagyva.')
      }
    }
    if (aboutImageId === null) {
      aboutImageId = await uploadMedia(payload, ABOUT_IMAGE)
      console.log('✓ Bemutatkozás kép feltöltve.')
    }

    // 5. Galéria képek feltöltése
    const existingGalleryCheck = await payload.find({ collection: 'gallery', limit: 1 })
    if (existingGalleryCheck.docs.length === 0 || RESET_IMAGES) {
      for (const img of GALLERY_IMAGES) {
        const mediaId = await uploadMedia(payload, img)
        await payload.create({
          collection: 'gallery',
          data: { image: mediaId, alt: img.alt },
        })
      }
      console.log(`✓ ${GALLERY_IMAGES.length} galéria kép feltöltve.`)
    } else {
      console.log('✓ Galéria képek már léteznek, kihagyva.')
    }

    // 6. PageContent global (képekkel)
    await payload.updateGlobal({
      slug: 'page-content',
      data: {
        hero: {
          badge: 'Győr, Adyváros',
          titleLine1: 'Ahol a',
          titleWord1: 'szépség',
          titleConnector: 'és',
          titleWord2: 'önbizalom',
          titleLine2: 'találkozik.',
          subtitle:
            'Személyre szabott arcápolás és professzionális kozmetikai kezelések egy nyugodt, nőies környezetben, Győr szívében.',
          ctaPrimaryLabel: 'Időpontot foglalok',
          ctaSecondaryLabel: 'Kezelések',
          image: heroImageId,
          imageAlt: HERO_IMAGE.alt,
          ratingScore: '5.0 / 5.0',
          ratingLabel: 'Kiváló',
        },
        about: {
          kicker: 'Üdvözlöm,',
          heading: 'Mészárosné Rött Renáta',
          headingHighlight: 'vagyok.',
          paragraphs: [
            {
              text: 'Szenvedélyem az arcápolás és az a folyamat, ahogy a bőr megfelelő törődéssel visszanyeri természetes szépségét és ragyogását. Számomra a kozmetika nem csupán egy szakma, hanem hivatás: célom, hogy minden vendégem önbizalommal telve és kipihenten távozzon tőlem.',
            },
            {
              text: 'Munkám során prémium minőségű, klinikailag igazolt hatóanyagokkal dolgozom. Folyamatosan képzem magam, hogy a legújabb bőrterápiás eljárásokat és technikákat alkalmazhassam a kezelések során, legyen szó problémás bőr kezeléséről vagy anti-aging terápiákról.',
            },
          ],
          image: aboutImageId,
          imageAlt: ABOUT_IMAGE.alt,
          stats: [
            { value: '10+', label: 'Év tapasztalat' },
            { value: '100%', label: 'Szakértelem' },
          ],
        },
        servicesSection: {
          heading: 'Személyre Szabott',
          headingHighlight: 'Kezelések',
          description:
            'Minden arcbőr más törődést igényel. Szolgáltatásaim fókuszában az egészséges, ragyogó bőr elérése áll, prémium hatóanyagokkal.',
          footnote:
            'Minden kezelést alapos bőrdiagnosztika előz meg. A teljes árlista a szalonban tekinthető meg.',
        },
        gallerySection: {
          heading: 'A Lenyugvás',
          headingHighlight: 'Szigete',
          subtitle: 'Pillantson be a szalon hangulatába',
        },
        contactSection: {
          heading: 'Ideje a',
          headingHighlight: 'megújulásnak',
          description:
            'Adja meg adatait, és hamarosan felveszem Önnel a kapcsolatot a pontos időpont egyeztetése céljából.',
          availabilityHeading: 'Elérhetőség',
        },
      },
    })
    console.log('✓ Oldal tartalom frissítve.')

    // 7. Szolgáltatások (csak ha üres)
    const existingServices = await payload.find({ collection: 'services', limit: 1 })
    if (existingServices.docs.length === 0) {
      for (const service of SERVICES) {
        await payload.create({ collection: 'services', data: service })
      }
      console.log(`✓ ${SERVICES.length} szolgáltatás létrehozva.`)
    } else {
      console.log('✓ Szolgáltatások már léteznek, kihagyva.')
    }

    console.log('\nSeed sikeresen lefutott!')
  } finally {
    await payload.destroy()
  }
}

await seed().catch((err) => {
  console.error('Seed hiba:', err)
  process.exitCode = 1
})
