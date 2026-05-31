export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="font-display text-xl tracking-widest text-paper/30">
          A<span className="text-accent/30">.</span>
        </span>
        <p className="font-mono text-xs text-muted/50 tracking-wider">
          © {new Date().getFullYear()} Aiman Fatima — Karachi, Pakistan
        </p>
        <p className="font-mono text-xs text-muted/30 tracking-wider">
          Built with Next.js
        </p>
      </div>
    </footer>
  )
}
