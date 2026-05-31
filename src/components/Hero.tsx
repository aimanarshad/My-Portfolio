'use client'
import { useEffect, useState } from 'react'
import { ArrowDown } from 'lucide-react'

const roles = [
  'Software Engineer',
  'Python Engineer',
  'Claude API Builder',
  'Full Stack Dev',
  'Agentic AI Creator',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    let i = typing ? displayed.length : displayed.length - 1

    if (typing && displayed.length === current.length) {
      const timer = setTimeout(() => setTyping(false), 1800)
      return () => clearTimeout(timer)
    }

    if (!typing && displayed.length === 0) {
      setRoleIndex((prev) => (prev + 1) % roles.length)
      setTyping(true)
      return
    }

    const speed = typing ? 80 : 40
    const timer = setTimeout(() => {
      setDisplayed(typing ? current.slice(0, i + 1) : current.slice(0, i))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, typing, roleIndex])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,240,232,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,232,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent blob */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff4d1c 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full">
        {/* Status badge */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Available for internships & freelance
          </span>
        </div>

        {/* Big name */}
        <div className="mb-4" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-none text-paper tracking-wider glow-text">
            AIMAN
          </h1>
         
        </div>

        {/* Typing role */}
        <div className="flex items-center gap-3 mb-8">
          <span className="line-decoration" />
          <p className="font-mono text-sm text-accent tracking-wider">
            {displayed}
            <span className="animate-blink">|</span>
          </p>
        </div>

        {/* Description */}
        <p className="max-w-xl font-body text-muted text-lg leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          7th semester Software Engineering student at UBIT, University of Karachi —
          building intelligent systems with{' '}
          <span className="text-paper">Generative AI</span>,{' '}
          <span className="text-paper">Agentic AI</span>, and{' '}
          <span className="text-paper">Claude API</span>.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <a
            href="#projects"
            className="group flex items-center gap-3 bg-accent text-ink font-mono text-sm tracking-widest uppercase px-8 py-4 hover:bg-paper transition-all duration-300"
          >
            View Work
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="font-mono text-sm tracking-widest uppercase text-muted hover:text-paper transition-colors duration-300 underline underline-offset-4 decoration-muted hover:decoration-paper"
          >
            Get in Touch
          </a>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-16 right-6 flex flex-col gap-6 text-right animate-fade-in" style={{ animationDelay: '0.8s' }}>
          {[
            { num: '7th', label: 'Semester' },
            { num: '3+', label: 'AI Projects' },
            { num: 'UBIT', label: 'University' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl text-accent">{stat.num}</div>
              <div className="font-mono text-xs text-muted tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <span className="font-mono text-xs text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  )
}
