import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function StarField() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const container = mountRef.current
    if (!container) return

    const W = window.innerWidth
    const H = window.innerHeight
    const isMobile = W < 768
    const STAR_COUNT = isMobile ? 700 : 1800

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)

    const canvas = renderer.domElement
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;'
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000)
    camera.position.z = 5

    // Main star field
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(STAR_COUNT * 3)
    const starCol = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 130
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 130
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 90

      const r = Math.random()
      if (r > 0.85) {
        starCol[i * 3] = 0.3
        starCol[i * 3 + 1] = 0.85
        starCol[i * 3 + 2] = 1.0 // cyan
      } else if (r > 0.72) {
        starCol[i * 3] = 0.6
        starCol[i * 3 + 1] = 0.6
        starCol[i * 3 + 2] = 1.0 // blue-white
      } else {
        starCol[i * 3] = 0.95
        starCol[i * 3 + 1] = 0.95
        starCol[i * 3 + 2] = 1.0 // near-white
      }
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3))

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.065,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    })
    const mainStars = new THREE.Points(starGeo, starMat)
    scene.add(mainStars)

    // Bright accent stars (larger cyan glow)
    const ACCENT = 55
    const accentGeo = new THREE.BufferGeometry()
    const accentPos = new Float32Array(ACCENT * 3)
    for (let i = 0; i < ACCENT; i++) {
      accentPos[i * 3] = (Math.random() - 0.5) * 90
      accentPos[i * 3 + 1] = (Math.random() - 0.5) * 90
      accentPos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPos, 3))
    const accentMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.3,
    })
    const accentStars = new THREE.Points(accentGeo, accentMat)
    scene.add(accentStars)

    // Purple accent nebula dots
    const NEBULA = 30
    const nebulaGeo = new THREE.BufferGeometry()
    const nebulaPos = new Float32Array(NEBULA * 3)
    for (let i = 0; i < NEBULA; i++) {
      nebulaPos[i * 3] = (Math.random() - 0.5) * 100
      nebulaPos[i * 3 + 1] = (Math.random() - 0.5) * 100
      nebulaPos[i * 3 + 2] = (Math.random() - 0.5) * 70
    }
    nebulaGeo.setAttribute('position', new THREE.BufferAttribute(nebulaPos, 3))
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25,
    })
    const nebulaStars = new THREE.Points(nebulaGeo, nebulaMat)
    scene.add(nebulaStars)

    // Mouse parallax
    let targetX = 0,
      targetY = 0,
      currentX = 0,
      currentY = 0
    const onMouse = (e) => {
      targetX = (e.clientX / innerWidth - 0.5) * 1.4
      targetY = -(e.clientY / innerHeight - 0.5) * 1.4
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)

    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      currentX += (targetX - currentX) * 0.022
      currentY += (targetY - currentY) * 0.022

      mainStars.rotation.y += 0.00022
      mainStars.rotation.x += 0.00011
      accentStars.rotation.y += 0.00038
      accentStars.rotation.x += 0.00018
      nebulaStars.rotation.y -= 0.0003
      nebulaStars.rotation.x -= 0.00015

      camera.position.x = currentX * 0.28
      camera.position.y = currentY * 0.28
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      starGeo.dispose()
      starMat.dispose()
      accentGeo.dispose()
      accentMat.dispose()
      nebulaGeo.dispose()
      nebulaMat.dispose()
      if (container.contains(canvas)) container.removeChild(canvas)
    }
  }, [])

  return <div ref={mountRef} aria-hidden="true" />
}
