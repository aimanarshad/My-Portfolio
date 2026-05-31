'use client'
import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const follower = document.getElementById('cursor-follower')
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursor) {
        cursor.style.left = `${mouseX - 6}px`
        cursor.style.top = `${mouseY - 6}px`
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX - 18) * 0.1
      followerY += (mouseY - followerY - 18) * 0.1
      if (follower) {
        follower.style.left = `${followerX}px`
        follower.style.top = `${followerY}px`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    animate()
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div id="cursor" className="cursor" />
      <div id="cursor-follower" className="cursor-follower" />
    </>
  )
}
