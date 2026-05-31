'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

type Project = {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
  status: string
  github: string
  live: string
  video?: string
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'GoldPulse PRO — Real-Time Gold Rates for Pakistan, Powered by AI',
    description: 'Tracking gold prices in Pakistan just got smarter. A live precious metals terminal with real-time 24K & 22K gold rates, silver prices, AI-driven market analysis, and city-specific rates for Karachi, Lahore and more.',
    tags: ['Claude API', 'Python', 'FastAPI', 'React'],
    status: 'Live',
    github: 'https://github.com',
    live: 'https://lnkd.in/ecb4d38A',
    video: 'https://drive.google.com/file/d/1-p0BA3t2CW8LJC7AcQwYjcyBE-l1CNUc/preview',
  },
  {
    id: '2',
    number: '02',
    title: 'Python Full Stack Web App',
    description: 'A full-stack task management application with user authentication, real-time updates, and a clean dashboard — built with FastAPI backend and Next.js frontend.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Tailwind'],
    status: 'Coming Soon',
    github: '#',
    live: '#',
  },
  {
    id: '3',
    number: '03',
    title: 'Agentic AI Document Analyzer',
    description: 'An intelligent agent that reads uploaded documents, extracts key information, answers questions, and generates structured summaries using Agentic AI patterns.',
    tags: ['Agentic AI', 'LangChain', 'Claude API', 'Python'],
    status: 'Coming Soon',
    github: '#',
    live: '#',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS)

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_projects')
    if (saved) setProjects(JSON.parse(saved))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-enter').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [projects])

  // Convert any Google Drive /view link to /preview automatically
  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview')
  }

  return (
    <section id="projects" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-enter flex items-center gap-3 mb-4">
          <span className="line-decoration" />
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Work</span>
        </div>

        <div className="flex items-end justify-between mb-16">
          <h2 className="section-enter font-display text-6xl text-paper tracking-wider" style={{ transitionDelay: '0.1s' }}>
            FEATURED<br /><span className="text-accent">PROJECTS</span>
          </h2>
          <a
            href="https://github.com/aimanarshad"
            target="_blank"
            rel="noopener noreferrer"
            className="section-enter flex items-center gap-2 font-mono text-xs text-muted hover:text-paper transition-colors tracking-widest uppercase"
            style={{ transitionDelay: '0.2s' }}
          >
            All on GitHub <ArrowRight size={12} />
          </a>
        </div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="section-enter project-card p-8 group"
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              <div className="flex items-start justify-between gap-8 mb-4">
                <div className="flex items-start gap-6 flex-1">
                  <span className="font-display text-5xl text-paper/10 group-hover:text-accent/20 transition-colors leading-none mt-1">
                    {project.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-body font-medium text-xl text-paper group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-muted/60 border border-muted/20 px-2 py-0.5">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed mb-4 max-w-xl">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="tag-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.github && project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-paper transition-colors" aria-label="GitHub">
                      <Github size={18} />
                    </a>
                  )}
                  {project.live && project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label="Live">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Video embed */}
              {project.video && (
                <div className="mt-4 ml-[72px]">
                  <iframe
                    src={getEmbedUrl(project.video)}
                    className="w-full border border-white/10 rounded"
                    style={{ height: '360px' }}
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}