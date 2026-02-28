import { useEffect, useRef } from 'react'

class Particle {
  constructor(canvas, ctx, theme, mouse, mouseRadius) {
    this.canvas = canvas
    this.ctx = ctx
    this.theme = theme
    this.mouse = mouse
    this.mouseRadius = mouseRadius
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2 + 1
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1

    // Mouse interaction
    if (this.mouse.x !== null && this.mouse.y !== null) {
      let dx = this.mouse.x - this.x
      let dy = this.mouse.y - this.y
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < this.mouseRadius) {
        let force = (this.mouseRadius - distance) / this.mouseRadius
        this.x -= dx * force * 0.02
        this.y -= dy * force * 0.02
      }
    }
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fillStyle =
      this.theme === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(37, 99, 235, 0.35)'
    this.ctx.fill()
  }
}

export function ParticlesNetwork({ theme }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const particleCount = 60
    const connectionDistance = 150
    const mouseRadius = 150

    let mouse = { x: null, y: null }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const handleMouseMove = (event) => {
      mouse.x = event.x
      mouse.y = event.y
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx, theme, mouse, mouseRadius))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x
          let dy = particles[i].y - particles[j].y
          let distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(255, 255, 255, ${0.25 * (1 - distance / connectionDistance)})`
                : `rgba(37, 99, 235, ${0.18 * (1 - distance / connectionDistance)})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    handleResize()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}
