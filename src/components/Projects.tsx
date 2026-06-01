'use client'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Project = {
  id: string
  number: string
  title: string
  description: string
  tags: string
  status: string
  github: string
  live: string
  video?: string
}

const getEmbedUrl = (url: string) => {
  if (!url) return ''
  return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview')
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('Projects')
        .select('*')
        .order('number', { ascending: true })

      if (!error && data) setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-enter').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [projects])

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

        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="font-mono text-xs text-muted tracking-widest uppercase animate-pulse">Loading projects...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="section-enter group flex flex-col rounded-none overflow-hidden"
              style={{
                transitionDelay: `${0.1 * i}s`,
                background: 'linear-gradient(135deg, rgba(255,77,28,0.04) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,77,28,0.12)',
              }}
            >
              {/* Video on top */}
              {project.video && (
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <iframe
                    src={getEmbedUrl(project.video)}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                  {/* Gradient overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.8), transparent)' }} />
                </div>
              )}

              {/* Card content */}
              <div className="p-6 flex flex-col flex-1">

                {/* Number + links row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-5xl leading-none"
                    style={{ WebkitTextStroke: '1px rgba(255,77,28,0.3)', color: 'transparent' }}>
                    {project.number}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-muted hover:text-paper hover:border-accent/40 transition-all">
                        <Github size={14} />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 border border-white/10 flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Status badge */}
                <div className="mb-3">
                  <span className={`font-mono text-xs tracking-widest uppercase px-2 py-1 ${
                    project.status === 'Live'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-white/5 text-muted border border-white/10'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-body font-semibold text-lg text-paper group-hover:text-accent transition-colors leading-snug mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-4 border-t border-white/5">
                  {(typeof project.tags === 'string'
                    ? project.tags.split(',')
                    : project.tags || []
                  ).map((tag: string) => (
                    <span key={tag} className="tag-chip">{tag.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}