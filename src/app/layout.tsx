import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aiman — AI & Full Stack Developer',
  description: 'Software Engineering student specializing in Generative AI, Agentic AI, Claude API, and Python full-stack development.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
