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

  const [settings, pageContent, servicesResult, galleryResult] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.findGlobal({ slug: 'page-content' }),
    payload.find({ collection: 'services', sort: '_order', limit: 20 }),
    payload.find({ collection: 'gallery', sort: '_order', limit: 6, depth: 1 }),
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
            caption: doc.caption,
          }
        : null
    })
    .filter(
      (img): img is { id: number; url: string; alt: string; caption: string | null | undefined } =>
        img !== null,
    )

  const settingsData = {
    phone: settings.phone || '+36 30 964 8446',
    email: settings.email || 'meszarosnerottrenata@gmail.com',
    address: settings.address || 'Ifjúság körút 83, 9023 Győr',
    openingHours: settings.openingHours,
    mapEmbedUrl: settings.mapEmbedUrl,
    facebook: settings.facebook,
    instagram: settings.instagram,
    branding: settings.branding,
    navigation: settings.navigation,
    footer: settings.footer,
  }

  const hero = pageContent.hero || {}
  const heroImage = typeof hero.image === 'object' ? hero.image : null

  const about = pageContent.about || {}
  const aboutImage = typeof about.image === 'object' ? about.image : null

  return (
    <>
      <Navbar branding={settingsData.branding} navigation={settingsData.navigation} />
      <Hero
        data={{
          badge: hero.badge,
          titleLine1: hero.titleLine1,
          titleWord1: hero.titleWord1,
          titleConnector: hero.titleConnector,
          titleWord2: hero.titleWord2,
          titleLine2: hero.titleLine2,
          subtitle: hero.subtitle,
          ctaPrimaryLabel: hero.ctaPrimaryLabel,
          ctaSecondaryLabel: hero.ctaSecondaryLabel,
          imageUrl: heroImage?.url,
          imageAlt: hero.imageAlt,
          ratingScore: hero.ratingScore,
          ratingLabel: hero.ratingLabel,
        }}
      />
      <Services services={services} content={pageContent.servicesSection} />
      <About
        data={{
          kicker: about.kicker,
          heading: about.heading,
          headingHighlight: about.headingHighlight,
          paragraphs: about.paragraphs,
          imageUrl: aboutImage?.url,
          imageAlt: about.imageAlt,
          stats: about.stats,
        }}
      />
      <Gallery images={galleryImages.length > 0 ? galleryImages : undefined} content={pageContent.gallerySection} />
      <BookingContact settings={settingsData} services={services} content={pageContent.contactSection} />
      <Footer settings={settingsData} />
    </>
  )
}
