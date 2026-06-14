'use client'

import { useEffect, useState } from 'react'

const links = [
  { href: '#szolgaltatasok', label: 'Szolgáltatások' },
  { href: '#bemutatkozas', label: 'Rólam' },
  { href: '#galeria', label: 'Galéria' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [menuOpen])

  return (
    <>
      <nav
        className={`glass-nav fixed top-0 w-full z-50 transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center">
          <a
            href="#"
            className="font-serif text-2xl font-medium tracking-tight text-brand-burgundy flex items-center gap-2"
          >
            RENI{' '}
            <span className="text-brand-brown/50 text-sm font-sans tracking-widest uppercase mt-1">
              Kozmetika
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-brand-burgundy transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-burgundy transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="#foglalas"
              className="bg-brand-burgundy text-brand-cream px-6 py-2.5 rounded-full hover:bg-brand-brown transition-colors shadow-[0_4px_14px_0_rgba(123,60,74,0.2)] hover:shadow-[0_6px_20px_rgba(123,60,74,0.3)] hover:-translate-y-[1px] active:scale-[0.98] duration-200"
            >
              Időpontfoglalás
            </a>
          </div>

          <button
            className="md:hidden text-brand-burgundy text-2xl p-2"
            aria-label="Menü nyitása"
            onClick={() => setMenuOpen(true)}
          >
            <i className="ph ph-list" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-brand-cream z-[100] flex-col items-center justify-center gap-8 text-xl font-serif ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <button
          className="absolute top-6 right-6 text-brand-burgundy text-3xl"
          aria-label="Menü bezárása"
          onClick={() => setMenuOpen(false)}
        >
          <i className="ph ph-x" />
        </button>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-brand-brown hover:text-brand-burgundy"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#foglalas"
          className="text-brand-burgundy font-medium mt-4 border-b border-brand-burgundy pb-1"
          onClick={() => setMenuOpen(false)}
        >
          Időpontot kérek
        </a>
      </div>
    </>
  )
}
