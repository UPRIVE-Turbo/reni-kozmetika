import React from 'react'
import Script from 'next/script'
import { Lora, Open_Sans } from 'next/font/google'
import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'RENI Kozmetika | Szépség és Önbizalom | Győr, Adyváros',
  description:
    'Professzionális kozmetikai kezelések, arcápolás Győrben, Adyvárosban. Foglaljon időpontot Mészárosné Rött Renátához.',
  openGraph: {
    title: 'RENI Kozmetika | Szépség és Önbizalom',
    description:
      'Professzionális kozmetikai kezelések, arcápolás Győrben, Adyvárosban. Foglaljon időpontot még most.',
    locale: 'hu_HU',
    type: 'website',
  },
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
