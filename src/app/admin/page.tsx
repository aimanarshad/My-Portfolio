'use client'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Save, ArrowLeft, Edit2, X, Check } from 'lucide-react'

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

const EMPTY_FORM = {
  title: '',
  description: '',
  tags: '',
  status: 'Live',
  github: '',
  live: '',
  video: '',
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    number: '01',
    title: 'GoldPulse PRO — Real-Time Gold Rates Pakistan',
    description: 'A live precious metals terminal built for the Pakistani market. Tracks real-time 24K & 22K gold rates, silver prices, and USD to PKR exchange rates with city-specific data for Karachi, Lahore and more. Features an AI-driven market analysis engine and a physical gold calculator to help investors and jewelers make smarter decisions.',
    tags: ['AI', 'Python', 'Real-Time Data', 'Finance', 'Gold Rates', 'Exchange Rate', 'Pakistan'],
    status: 'Live',
    github: '#',
    live: 'https://lnkd.in/ecb4d38A',
    video: 'https://drive.google.com/file/d/1-p0BA3t2CW8LJC7AcQwYjcyBE-l1CNUc/view?usp=sharing',
  },
]

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [wrongPass, setWrongPass] = useState(false)

  const ADMIN_PASSWORD = 'aiman2024'

  useEffect(() => {
    const cursor = document.createElement('div')
    cursor.id = 'cursor'
    cursor.className = 'cursor'
    const follower = document.createElement('div')
    follower.id = 'cursor-follower'
    follower.className = 'cursor-follower'
    document.body.appendChild(cursor)
    document.body.appendChild(follower)

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = `${mouseX - 6}px`
      cursor.style.top = `${mouseY - 6}px`
    }

    let animFrame: number
    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.1
      followerY += (mouseY - followerY - 18) * 0.1
      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`
      animFrame = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animFrame)
      cursor.remove()
      follower.remove()
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('portfolio_projects')
    setProjects(stored ? JSON.parse(stored) : DEFAULT_PROJECTS)
  }, [])

  const saveToStorage = (updated: Project[]) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(updated))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleAdd = () => {
    if (!form.title.trim()) return
    const newProject: Project = {
      id: Date.now().toString(),
      number: String(projects.length + 1).padStart(2, '0'),
      title: form.title,
      description: form.description,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      status: form.status,
      github: form.github || '#',
      live: form.live || '#',
      video: form.video || '',
    }
    const updated = [...projects, newProject]
    setProjects(updated)
    saveToStorage(updated)
    setForm(EMPTY_FORM)
  }

  const handleDelete = (id: string) => {
    const updated = projects
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }))
    setProjects(updated)
    saveToStorage(updated)
  }

  const startEdit = (project: Project) => {
    setEditingId(project.id)
    setForm({
      title: project.title,
      description: project.description,
      tags: (project.tags || []).join(', '),
      status: project.status,
      github: project.github,
      live: project.live,
      video: project.video || '',
    })
  }

  const saveEdit = () => {
    const updated = projects.map((p) =>
      p.id === editingId
        ? {
            ...p,
            title: form.title,
            description: form.description,
            tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
            status: form.status,
            github: form.github || '#',
            live: form.live || '#',
            video: form.video || '',
          }
        : p
    )
    setProjects(updated)
    saveToStorage(updated)
    setEditingId(null)
    setForm(EMPTY_FORM)
  }

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setWrongPass(true)
      setTimeout(() => setWrongPass(false), 2000)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-4xl text-[#f5f0e8] tracking-widest mb-2">ADMIN</h1>
          <p className="font-mono text-xs text-[#8b8680] tracking-widest uppercase mb-8">Portfolio Manager</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className={`w-full bg-transparent border px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-mono text-sm focus:outline-none mb-4 transition-colors ${
              wrongPass ? 'border-red-500' : 'border-white/10 focus:border-[#ff4d1c]/50'
            }`}
          />
          {wrongPass && (
            <p className="font-mono text-xs text-red-400 mb-4">Wrong password. Try again.</p>
          )}
          <button
            onClick={handleLogin}
            className="w-full bg-[#ff4d1c] text-[#0a0a0f] font-mono text-sm tracking-widest uppercase py-3 hover:bg-[#f5f0e8] transition-colors"
          >
            Enter
          </button>
          <p className="font-mono text-xs text-[#8b8680]/40 mt-6 text-center">
            Password: aiman2024 — change it in admin/page.tsx
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f5f0e8] px-6 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-12">
          <div>
            <a
              href="/"
              className="flex items-center gap-2 font-mono text-xs text-[#8b8680] hover:text-[#f5f0e8] tracking-widest uppercase mb-4 transition-colors"
            >
              <ArrowLeft size={12} /> Back to Portfolio
            </a>
            <h1 className="font-display text-5xl tracking-widest">
              PROJECT<br />
              <span className="text-[#ff4d1c]">MANAGER</span>
            </h1>
          </div>
          {saved && (
            <div className="flex items-center gap-2 font-mono text-xs text-green-400 border border-green-400/20 px-4 py-2">
              <Check size={12} /> Saved!
            </div>
          )}
        </div>

        <div className="border border-white/5 bg-white/2 p-8 mb-10">
          <p className="font-mono text-xs text-[#ff4d1c] tracking-widest uppercase mb-6">
            {editingId ? '✏ Edit Project' : '＋ Add New Project'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Project Title *"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors"
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-[#0a0a0f] border border-white/10 px-4 py-3 text-[#f5f0e8] font-mono text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors"
            >
              <option>Live</option>
              <option>Coming Soon</option>
              <option>In Progress</option>
              <option>Archived</option>
            </select>
          </div>

          <textarea
            rows={3}
            placeholder="Project Description *"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors resize-none mb-4"
          />

          <input
            type="text"
            placeholder="Tags (comma separated) e.g. Python, Claude API, React"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            className="w-full bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="GitHub URL"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors"
            />
            <input
              type="text"
              placeholder="Live Demo URL"
              value={form.live}
              onChange={(e) => setForm({ ...form, live: e.target.value })}
              className="bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors"
            />
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Video URL (Google Drive, YouTube, or direct .mp4 link)"
              value={form.video}
              onChange={(e) => setForm({ ...form, video: e.target.value })}
              className="w-full bg-transparent border border-white/10 px-4 py-3 text-[#f5f0e8] placeholder-[#8b8680]/50 font-body text-sm focus:outline-none focus:border-[#ff4d1c]/50 transition-colors"
            />
            <p className="font-mono text-xs text-[#8b8680]/40 mt-2">
              For Google Drive: open file → Share → Anyone with link → copy the link
            </p>
          </div>

          <div className="flex gap-3">
            {editingId ? (
              <>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-2 bg-[#ff4d1c] text-[#0a0a0f] font-mono text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#f5f0e8] transition-colors"
                >
                  <Save size={12} /> Save Changes
                </button>
                <button
                  onClick={() => { setEditingId(null); setForm(EMPTY_FORM) }}
                  className="flex items-center gap-2 border border-white/10 text-[#8b8680] font-mono text-xs tracking-widest uppercase px-6 py-3 hover:border-white/30 hover:text-[#f5f0e8] transition-colors"
                >
                  <X size={12} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-[#ff4d1c] text-[#0a0a0f] font-mono text-xs tracking-widest uppercase px-6 py-3 hover:bg-[#f5f0e8] transition-colors"
              >
                <Plus size={12} /> Add Project
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs text-[#8b8680] tracking-widest uppercase mb-4">
            {projects.length} Project{projects.length !== 1 ? 's' : ''}
          </p>
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-start justify-between gap-6 border border-white/5 bg-white/2 p-6 hover:border-[#ff4d1c]/20 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <span className="font-display text-3xl text-[#ff4d1c]/30 leading-none shrink-0">
                  {project.number}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-body font-medium text-[#f5f0e8]">{project.title}</h3>
                    <span className="font-mono text-xs text-[#8b8680]/60 border border-[#8b8680]/20 px-2 py-0.5 shrink-0">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-[#8b8680] text-sm leading-relaxed mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {(project.tags || []).map((tag) => (
                      <span key={tag} className="tag-chip">{tag}</span>
                    ))}
                  </div>
                  {project.video && (
                    <a
                      href={project.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[#ff4d1c]/60 hover:text-[#ff4d1c] transition-colors"
                    >
                      🎥 Video attached
                    </a>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => startEdit(project)}
                  className="p-2 text-[#8b8680] hover:text-[#f5f0e8] transition-colors border border-transparent hover:border-white/10"
                  title="Edit"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-[#8b8680] hover:text-red-400 transition-colors border border-transparent hover:border-red-400/20"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs text-[#8b8680]/30 mt-8 text-center">
          Projects are saved in your browser. Visit /admin anytime to manage them.
        </p>
      </div>
    </div>
  )
}