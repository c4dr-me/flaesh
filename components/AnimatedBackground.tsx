'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    window.addEventListener('resize', resizeCanvas)

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random() * 0.5 + 0.5,
    }))

    const drawStars = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        ctx.fill()
      })
    }

    const animateStars = () => {
      stars.forEach((star) => {
        star.y += 0.3
        if (star.y > canvas.height) star.y = 0
      })
      drawStars()
      requestAnimationFrame(animateStars)
    }

    animateStars()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Star Field */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[-2]" />

      {/* Animated Gradient */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(600px at 0% 0%, rgba(157, 34, 0, 0.7) 0%, transparent 70%)',
            'radial-gradient(600px at 100% 100%, rgba(157, 34, 0, 0.7) 0%, transparent 70%)',
            'radial-gradient(600px at 50% 50%, rgba(157, 34, 0, 0.7) 0%, transparent 70%)',
            'radial-gradient(600px at 0% 100%, rgba(157, 34, 0, 0.7) 0%, transparent 70%)',
            'radial-gradient(600px at 100% 0%, rgba(157, 34, 0, 0.7) 0%, transparent 70%)',
          ],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 10,
        }}
      />
    </div>
  )
}