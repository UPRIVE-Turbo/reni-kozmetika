import { getPayload } from 'payload'
import config from './payload.config'

const services = [
  {
    name: 'Klasszikus Arctisztítás',
    description:
      'Mélytisztítás, gőzölés, mitesszerek eltávolítása és nyugtató maszk a tiszta arcbőrért.',
    price: 'kb. 90 perc',
    icon: 'sparkle',
    order: 1,
  },
  {
    name: 'Kémiai Peeling',
    description:
      'Bőrmegújító savas hámlasztás pigmentfoltok, finom ráncok és akné hegek halványítására.',
    price: 'kb. 45 perc',
    icon: 'drop',
    order: 2,
  },
  {
    name: 'Relaxáló Arcmasszázs',
    description:
      'Feszültségoldó, izomlazító mozdulatok értékes növényi olajokkal az arc, nyak és dekoltázs területén.',
    price: 'kb. 30 perc',
    icon: 'flower-lotus',
    order: 3,
  },
  {
    name: 'Szempilla & Szemöldök',
    description: 'Szemöldökszedés, tartós festés és laminálás a tekintet tökéletes kiemeléséért.',
    price: 'kb. 15-45 perc',
    icon: 'eye',
    order: 4,
  },
]

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      companyName: 'RENI Kozmetika',
      phone: '+36 30 964 8446',
      email: 'meszarosnerottrenata@gmail.com',
      address: 'Ifjúság körút 83, 9023 Győr, Adyváros',
      openingHours: 'Kizárólag előzetes bejelentkezés alapján.',
      instagram: 'https://www.instagram.com/gmail.com',
      mapEmbedUrl:
        'https://www.google.com/maps?q=Ifj%C3%BAs%C3%A1g+k%C3%B6r%C3%BAt+83%2C+Gy%C5%91r&output=embed',
    },
  })
  console.log('Settings frissítve.')

  const existing = await payload.find({ collection: 'services', limit: 100 })
  if (existing.docs.length === 0) {
    for (const service of services) {
      await payload.create({ collection: 'services', data: service })
    }
    console.log(`${services.length} szolgáltatás létrehozva.`)
  } else {
    console.log('Szolgáltatások már léteznek, kihagyva.')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
