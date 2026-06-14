import { getPayload } from 'payload'
import config from '@/payload.config'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Gallery from './components/Gallery'
import BookingContact from './components/BookingContact'
import Footer from './components/Footer'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [settings, servicesResult, galleryResult] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'services', sort: 'order', limit: 20 }),
    payload.find({ collection: 'gallery', sort: 'order', limit: 6, depth: 1 }),
  ])

  const services = servicesResult.docs.map((doc) => ({
    id: doc.id,
    name: doc.name,
    description: doc.description,
    price: doc.price,
  }))

  const galleryImages = galleryResult.docs
    .map((doc) => {
      const media = typeof doc.image === 'object' ? doc.image : null
      return media?.url
        ? {
            id: doc.id,
            url: media.url,
            alt: doc.alt,
          }
        : null
    })
    .filter((img): img is { id: number; url: string; alt: string } => img !== null)

  const settingsData = {
    phone: settings.phone || '+36 30 964 8446',
    email: settings.email || 'meszarosnerottrenata@gmail.com',
    address: settings.address || 'Ifjúság körút 83, 9023 Győr',
    openingHours: settings.openingHours,
    mapEmbedUrl: settings.mapEmbedUrl,
    facebook: settings.facebook,
    instagram: settings.instagram,
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Services services={services} />
      <About />
      <Gallery images={galleryImages.length > 0 ? galleryImages : undefined} />
      <BookingContact settings={settingsData} services={services} />
      <Footer settings={settingsData} />
    </>
  )
}
