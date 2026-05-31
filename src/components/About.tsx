'use client'
import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-enter').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — text */}
          <div>
            <div className="section-enter flex items-center gap-3 mb-6">
              <span className="line-decoration" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">About Me</span>
            </div>

            <h2 className="section-enter font-display text-6xl text-paper tracking-wider mb-8" style={{ transitionDelay: '0.1s' }}>
              BUILDING THE<br />
              <span className="text-accent">AI-FIRST</span><br />
              FUTURE
            </h2>

            <div className="section-enter space-y-4 text-muted leading-relaxed" style={{ transitionDelay: '0.2s' }}>
              <p>
                I'm a <span className="text-paper">Software Engineering</span> student at UBIT, University of Karachi, deeply focused on
                the intersection of <span className="text-paper">Generative AI</span> and real-world applications.
                My expertise also lies in <span className="text-paper">Full Stack Web development in Nextjs and MERN stack</span>.
              </p>
              <p>
                My core expertise lies in <span className="text-paper">Claude API development</span>,{' '}
                <span className="text-paper">Agentic AI systems</span>, and Python full-stack web development.
                I build tools that actually solve problems — chatbots, automation pipelines, intelligent agents.
              </p>
              <p>
                Currently seeking internships and freelance opportunities where I can apply cutting-edge
                AI skills to create meaningful products.
              </p>
              <p>"Completed 80+ Python assignments and projects in a single week through the Panaverse Modern AI with Python program."</p>
            </div>

            <div className="section-enter mt-8 flex flex-wrap gap-2" style={{ transitionDelay: '0.3s' }}>
              {['Karachi, Pakistan', 'UBIT — 7th Sem', 'Open to Work'].map((tag) => (
                <span key={tag} className="tag-chip">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — portrait placeholder + decorative */}
          <div className="section-enter relative" style={{ transitionDelay: '0.2s' }}>
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Frame decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-accent/20" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-paper/5" />

              {/* Main box */}
              <div className="w-full h-full bg-soft flex items-center justify-center border border-white/5 relative overflow-hidden">
                {/* Replace this div with an <img> tag once you have your photo */}
                <img src="./aiman image.jpeg" alt="aiman" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
