'use client'
import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Generative AI', level: 70 },
      { name: 'Claude API / Anthropic', level: 52 },
      { name: 'Agentic AI Systems', level: 85 },
      { name: 'LLM Integration', level: 88 },
    ],
  },
  {
    category: 'Development',
    skills: [
      
      { name: 'Full Stack Web Dev', level: 80 },
      { name: 'REST APIs', level: 82 },
      { name: 'SQL / Databases', level: 75 },
    ],
  },
  {
    category: 'Tools & Technologies',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'Next.js / React', level: 72 },
      { name: 'Docker (basics)', level: 60 },
      { name: 'Linux / CLI', level: 78 },
    ],
  },
]

const techTags = [
  'Python', 'Claude API', 'FastAPI', 'Next.js',
  'React', 'PostgreSQL', 'MongoDB', , 'Git',
  'OpenAI API', 'Tailwind CSS', 'TypeScript', 'Linux',
]

export default function Skills() {
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
    <section id="skills" ref={ref} className="py-32 px-6 relative">
      {/* Accent glow */}
      <div
        className="absolute left-0 top-1/2 w-64 h-64 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ff4d1c, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="section-enter flex items-center gap-3 mb-4">
          <span className="line-decoration" />
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Expertise</span>
        </div>

        <h2 className="section-enter font-display text-6xl text-paper tracking-wider mb-16" style={{ transitionDelay: '0.1s' }}>
          SKILLS &<br /><span className="text-accent">TOOLS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="section-enter"
              style={{ transitionDelay: `${0.1 * gi}s` }}
            >
              <h3 className="font-mono text-xs tracking-widest uppercase text-accent mb-6 pb-3 border-b border-white/5">
                {group.category}
              </h3>
              <div className="space-y-5">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-body text-sm text-paper/80">{skill.name}</span>
                      <span className="font-mono text-xs text-muted">{skill.level}%</span>
                    </div>
                    <div className="h-px bg-white/5 relative overflow-hidden">
                      <div
                        className="skill-bar-fill absolute top-0 left-0"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="section-enter" style={{ transitionDelay: '0.4s' }}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Technologies I work with</p>
          <div className="flex flex-wrap gap-2">
            {techTags.map((tag) => (
              <span key={tag} className="tag-chip">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
