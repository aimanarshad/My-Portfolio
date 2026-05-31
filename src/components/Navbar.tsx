'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5'
          : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-2xl text-paper tracking-widest">
          A<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-ink transition-all duration-300"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
