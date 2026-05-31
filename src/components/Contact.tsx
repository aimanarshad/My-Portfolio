'use client'
import { useEffect, useRef } from 'react'
import { Mail, Github, Linkedin, Send } from 'lucide-react'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-enter').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Big background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display text-[20vw] leading-none tracking-wider"
          style={{ WebkitTextStroke: '1px rgba(245,240,232,0.03)', color: 'transparent' }}
        >
          CONTACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="section-enter flex items-center gap-3 mb-4">
          <span className="line-decoration" />
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Contact</span>
        </div>

        <h2
          className="section-enter font-display text-6xl text-paper tracking-wider mb-6"
          style={{ transitionDelay: '0.1s' }}
        >
          LET'S BUILD<br />
          <span className="text-accent">SOMETHING</span>
        </h2>

        <p
          className="section-enter text-muted text-lg max-w-lg mb-16 leading-relaxed"
          style={{ transitionDelay: '0.2s' }}
        >
          I'm open to internships, freelance software projects, and collaboration.
          If you have something interesting in mind — let's talk.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — links */}
          <div className="section-enter space-y-6" style={{ transitionDelay: '0.2s' }}>
            {[
              {
                icon: Mail,
                label: 'Email',
                value: 'aiman.aimanat2022@gmail.com',
                href: 'mailto:aiman.aimanat2022@gmail.com',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'github.com/aimanarshad',
                href: 'https://github.com/aimanarshad',
              },
              {
                icon: Linkedin,
                label: 'LinkedIn',
                value: 'linkedin.com/in/aiman-a-013152266',
                href: 'https://www.linkedin.com/in/aiman-a-013152266/',
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-5 border border-white/5 hover:border-accent/20 bg-soft/30 hover:bg-accent/5 transition-all duration-300"
              >
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-accent/30 transition-colors">
                  <Icon size={16} className="text-muted group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted tracking-widest uppercase mb-0.5">{label}</p>
                  <p className="text-paper text-sm group-hover:text-accent transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right — quick message form */}
          <div className="section-enter" style={{ transitionDelay: '0.3s' }}>
            <div className="p-8 border border-white/5 bg-soft/30">
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">Quick Message</p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-paper placeholder-muted/50 font-body text-sm focus:outline-none focus:border-accent/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-paper placeholder-muted/50 font-body text-sm focus:outline-none focus:border-accent/50 transition-colors"
                />
                <textarea
                  rows={4}
                  placeholder="What are you working on?"
                  className="w-full bg-transparent border border-white/10 px-4 py-3 text-paper placeholder-muted/50 font-body text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none"
                />
                <button className="group w-full flex items-center justify-center gap-3 bg-accent text-ink font-mono text-sm tracking-widest uppercase py-4 hover:bg-paper transition-colors duration-300">
                  Send Message
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
