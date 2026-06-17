'use client'

import React, { useEffect, useRef } from 'react'

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  /** How strongly the element shifts relative to scroll position. */
  factor?: number
  /** Maximum shift in pixels, in either direction. */
  maxOffset?: number
}

export default function Parallax({
  children,
  className = '',
  factor = 0.1,
  maxOffset = 30,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const offset = Math.max(-maxOffset, Math.min(maxOffset, window.scrollY * factor))
        el.style.transform = `translate3d(0, ${offset}px, 0)`
        frame = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [factor, maxOffset])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
