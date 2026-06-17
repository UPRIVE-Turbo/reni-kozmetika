import React from 'react'
import Script from 'next/script'
import { Lora, Open_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'

const lora = Lora({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-open-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const title = settings.seo?.metaTitle || 'RENI Kozmetika | Szépség és Önbizalom | Győr, Adyváros'
  const description =
    settings.seo?.metaDescription ||
    'Professzionális kozmetikai kezelések, arcápolás Győrben, Adyvárosban. Foglaljon időpontot Mészárosné Rött Renátához.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: 'hu_HU',
      type: 'website',
    },
  }
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="hu" className={`${lora.variable} ${openSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased overflow-x-hidden relative">
        {children}
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
      </body>
    </html>
  )
}
