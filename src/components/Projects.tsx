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
    "id": "1",
    "number": "01",
    "title": "GoldPulse PRO — Real-Time Gold Rates Pakistan",
    "description": "A live precious metals terminal built for the Pakistani market. Tracks real-time 24K & 22K gold rates, silver prices, and USD to PKR exchange rates with city-specific data for Karachi, Lahore and more. Features an AI-driven market analysis engine and a physical gold calculator to help investors and jewelers make smarter decisions.",
    "tags": ["AI", "Python", "Real-Time Data", "Finance", "Gold Rates", "Exchange Rate", "Pakistan"],
    "status": "Live",
    "github": "#",
    "live": "https://lnkd.in/ecb4d38A",
    "video": "https://drive.google.com/file/d/1-p0BA3t2CW8LJC7AcQwYjcyBE-l1CNUc/preview"
  },
  {
    "id": "2",
    "number": "02",
    "title": "School Management System — MERN Stack",
    "description": "A full-stack school management website built with the MERN stack. Features student & teacher management, course selection workflow, fee submission system, admin dashboard, secure authentication with role-based access, and a fully responsive interface.",
    "tags": ["MongoDB", "Express.js", "React.js", "Node.js", "MERN", "Full Stack", "REST API"],
    "status": "Live",
    "github": "#",
    "live": "#",
    "video": "https://drive.google.com/file/d/1eVJFedMtAgQdcUZTabyyCDJTrsxxnZ4B/preview"
  },
  {
    "id": "3",
    "number": "03",
    "title": "Karachi Bus Route Finder",
    "description": "A web and mobile app that helps Karachi commuters find the best bus routes between any two points. Suggests connected bus options when no direct route exists and integrates Google Maps for easy navigation. Built to solve real-world transportation problems using local knowledge and technology.",
    "tags": ["Google Maps API", "React", "Node.js", "Mobile", "Web App", "Karachi", "Transportation"],
    "status": "Live",
    "github": "#",
    "live": "https://preview--bus-route-guide.lovable.app/",
    "video": "https://drive.google.com/file/d/1urtHFMEcYZN7u1niQxQ6bf-rvKUlj_g6/preview"
  },
  {
    "id": "4",
    "number": "04",
    "title": "Pakistan News Website",
    "description": "A comprehensive news website delivering real-time updates from local and national Pakistani sources. Features multiple news categories, a clean responsive layout optimized for web and mobile, and a seamless reading experience built with scalability and performance in mind.",
    "tags": ["React", "Node.js", "News API", "Web Development", "UX Design", "Pakistan", "Responsive"],
    "status": "Live",
    "github": "#",
    "live": "#",
    "video": "https://drive.google.com/file/d/1wbMcDLo347sAgvVijVNKsYsqC6IAEmnZ/preview"
  },
  {
    "id": "5",
    "number": "05",
    "title": "AI To-Do Assistant — Hackathon Build",
    "description": "An AI-powered To-Do assistant built at a hackathon using Claude CLI and SpecKit Plus. Features AI-assisted task creation and prioritization, natural language input so you write tasks the way you think, and smarter daily organization. Demonstrates how spec-driven development combined with AI tools speeds up building while keeping the codebase clean and scalable.",
    "tags": ["Claude API", "AI", "Python", "Productivity", "Natural Language", "SpecKit", "Hackathon"],
    "status": "Live",
    "github": "https://github.com/aimanarshad/Hackathon-Todo-App-",
    "live": "#",
    "video": "https://drive.google.com/file/d/1eFOHXifWJCOyq7r51b_qugNmPzdmTp4F/preview"
  },
  {
    "id": "6",
    "number": "06",
    "title": "AI-Humanized Book Creation System",
    "description": "An AI-powered book creation system built at a hackathon using Claude CLI and SpecKit Plus. Generates book content that feels human — natural tone, clarity, and storytelling. The complete book structure and documentation are organized using DocuSaurus for easy maintenance and collaboration.",
    "tags": ["Claude API", "AI", "DocuSaurus", "SpecKit", "Content Generation", "Hackathon", "NLP"],
    "status": "Live",
    "github": "https://github.com/aimanarshad/Humanized_Robitcs_book",
    "live": "https://humanized-robitcs-book.vercel.app/",
    "video": "https://drive.google.com/file/d/1Gs2bJhTKmRRT_E8cmAwxh8KbHQuVsXIC/preview"
  },
  {
    "id": "7",
    "number": "07",
    "title": "LocalBus Finder — Smart Karachi Commute App",
    "description": "A smart mobile-responsive web app that helps Karachi commuters find the best local bus routes. Enter your destination or use voice input in English or Urdu — the app shows nearest buses, complete route details, alternate connections, and an interactive map view. Built with Speech Recognition and Text-to-Speech for bilingual accessibility using Google AI Studio and Firebase.",
    "tags": ["Google AI Studio", "Firebase", "Google Maps API", "Speech Recognition", "React", "Web App", "Karachi"],
    "status": "Live",
    "github": "https://github.com/aimanarshad/studio",
    "live": "#",
    "video": "https://drive.google.com/file/d/1urtHFMEcYZN7u1niQxQ6bf-rvKUlj_g6/preview"
  },
  {
    "id": "8",
    "number": "08",
    "title": "AI-Powered Teacher Agent",
    "description": "A full-stack AI learning assistant that acts as a 24/7 personal tutor. Provides instant explanations, practice quizzes, and step-by-step solutions to solve the lack of personalized learning support outside the classroom. Built with a Python + FastAPI backend for AI logic and a Next.js frontend for a clean interactive chat interface.",
    "tags": ["Python", "FastAPI", "Next.js", "Claude API", "AI", "EdTech", "Full Stack", "Chatbot"],
    "status": "Live",
    "github": "#",
    "live": "#",
    "video": "https://drive.google.com/file/d/1DsadWlMs-4o778Ca7FSOzO-BqsfXYkXA/preview"
  },
  {
    "id": "9",
    "number": "09",
    "title": "BMI Calculator Web App",
    "description": "A simple and interactive Body Mass Index calculator built with Python and Streamlit. Input your weight and height to instantly get your BMI with color-coded categories — Underweight, Normal Weight, Overweight, and Obese — for a clear and visually appealing experience.",
    "tags": ["Python", "Streamlit", "Web App", "Health", "Data Visualization"],
    "status": "Live",
    "github": "https://github.com/aimanarshad/BMI_CALCULATOR",
    "live": "https://lnkd.in/dmavE5FQ",
    "video": "https://drive.google.com/file/d/1yj7X7Muf3LVL3B7q8vB-MHBeMwVjadJy/preview"
  },
  {
    "id": "10",
    "number": "10",
    "title": "Furniture Store — Full Stack E-Commerce Website",
    "description": "A full-stack e-commerce website for a furniture store with a clean, modern design. Features product listings, detailed product pages, shopping cart, and a smooth browsing experience. Built with complete frontend and backend integration and deployed on Vercel.",
    "tags": ["Next.js", "React", "Node.js", "Full Stack", "E-Commerce", "Vercel", "Tailwind"],
    "status": "Live",
    "github": "https://github.com/aimanarshad/furniture_website_fullstack",
    "live": "https://furniture-website-fullstack.vercel.app/",
    "video": "https://drive.google.com/file/d/1Vm0WHDoBq4eH1lvP4HNuKWEC1uVWmHVr/preview"
  }
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