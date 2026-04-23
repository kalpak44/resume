import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  text: '#f1f5f9',
  muted: '#64748b',
}

const HOME_SECTIONS = ['about', 'experience', 'skills', 'contact']

// ── Logo ──────────────────────────────────────────────────

function LogoButton() {
  return (
    <Link
      to="/"
      style={{
        fontWeight: 800,
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        fontFamily: 'monospace',
        textDecoration: 'none',
        padding: '5px 11px',
        borderRadius: '100px',
        background:
          'linear-gradient(135deg, rgba(0,212,255,0.14), rgba(139,92,246,0.14))',
        border: '1px solid rgba(0,212,255,0.22)',
        color: C.cyan,
        transition: 'box-shadow 0.25s, border-color 0.25s, background 0.25s',
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.45)'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.55)'
        e.currentTarget.style.background =
          'linear-gradient(135deg, rgba(0,212,255,0.28), rgba(139,92,246,0.28))'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.22)'
        e.currentTarget.style.background =
          'linear-gradient(135deg, rgba(0,212,255,0.14), rgba(139,92,246,0.14))'
      }}
    >
      PU
    </Link>
  )
}

// ── Section button (home) ──────────────────────────────────

function NavBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 11px',
        borderRadius: '100px',
        background: active ? 'rgba(0,212,255,0.1)' : 'transparent',
        border: 'none',
        color: active ? C.cyan : C.muted,
        fontSize: '0.76rem',
        fontWeight: active ? 600 : 500,
        cursor: 'pointer',
        textTransform: 'lowercase',
        letterSpacing: '0.025em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'color 0.18s, background 0.18s',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = C.text
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = C.muted
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      {active && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: C.cyan,
            boxShadow: `0 0 8px ${C.cyan}`,
            flexShrink: 0,
            animation: 'navDotPulse 2s infinite',
          }}
        />
      )}
      {label}
    </button>
  )
}

// ── Link button ────────────────────────────────────────────

function NavLink({ to, label, active, hobby }) {
  const accent = hobby ? '#f472b6' : C.cyan
  const activeBg = hobby ? 'rgba(244,114,182,0.1)' : 'rgba(0,212,255,0.1)'
  return (
    <Link
      to={to}
      style={{
        padding: '5px 11px',
        borderRadius: '100px',
        background: active ? activeBg : 'transparent',
        color: active ? accent : C.muted,
        fontSize: '0.76rem',
        fontWeight: active ? 600 : 500,
        textDecoration: 'none',
        textTransform: 'lowercase',
        letterSpacing: '0.025em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        transition: 'color 0.18s, background 0.18s',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.color = hobby ? '#f472b6' : C.text
          e.currentTarget.style.background = hobby
            ? 'rgba(244,114,182,0.07)'
            : 'rgba(255,255,255,0.07)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.color = C.muted
          e.currentTarget.style.background = 'transparent'
        }
      }}
    >
      {active && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 8px ${accent}`,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </Link>
  )
}

// ── Breadcrumb (inner pages) ───────────────────────────────

function Breadcrumb({ location }) {
  const parts = location.pathname.split('/').filter(Boolean)
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.76rem' }}
    >
      <Link
        to="/"
        style={{
          color: C.muted,
          textDecoration: 'none',
          padding: '5px 10px',
          borderRadius: '100px',
          transition: 'color 0.18s, background 0.18s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = C.text
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = C.muted
          e.currentTarget.style.background = 'transparent'
        }}
      >
        home
      </Link>
      {parts.map((part, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span
            style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '0.68rem',
              padding: '0 2px',
            }}
          >
            ›
          </span>
          <span
            style={{
              padding: '5px 10px',
              borderRadius: '100px',
              color: i === parts.length - 1 ? C.cyan : C.muted,
              background: i === parts.length - 1 ? 'rgba(0,212,255,0.08)' : 'transparent',
              fontWeight: i === parts.length - 1 ? 600 : 500,
              maxWidth: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {part.replace(/-/g, ' ')}
          </span>
        </span>
      ))}
    </div>
  )
}

// ── Divider ────────────────────────────────────────────────

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '14px',
        background: 'rgba(255,255,255,0.1)',
        margin: '0 4px',
        flexShrink: 0,
      }}
    />
  )
}

// ── Main CinematicNav export ───────────────────────────────

export function CinematicNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState('')
  const [mounted, setMounted] = useState(false)

  // Slide-in entrance
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 280)
    return () => clearTimeout(t)
  }, [])

  // Scroll progress bar — works for both .cin-root (snap) and window scroll
  useEffect(() => {
    const container = document.querySelector('.cin-root') || window
    const onScroll = () => {
      if (container === window) {
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
      } else {
        const total = container.scrollHeight - container.clientHeight
        setProgress(total > 0 ? (container.scrollTop / total) * 100 : 0)
      }
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection (home only)
  useEffect(() => {
    if (!isHome) return
    const root = document.querySelector('.cin-root') || null
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { root, rootMargin: '-10px 0px -55% 0px', threshold: 0 }
    )
    HOME_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome, location.pathname])

  // Derive active display — reset when not on home
  const displayActive = isHome ? active : ''

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const container = document.querySelector('.cin-root')
    if (container) {
      // getBoundingClientRect gives position relative to container viewport
      const elRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      container.scrollBy({ top: elRect.top - containerRect.top, behavior: 'smooth' })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const isCheatSheets = location.pathname.startsWith('/cheat-sheets')
  const isProjects = location.pathname.startsWith('/projects')

  return (
    <>
      <style>{`
        @keyframes navDotPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #00d4ff; }
          50% { opacity: 0.6; box-shadow: 0 0 14px #00d4ff, 0 0 24px #00d4ff55; }
        }
        @media (max-width: 640px) {
          nav[aria-label="Page navigation"] { display: none !important; }
        }
      `}</style>

      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.cyan}, ${C.purple}, #f472b6)`,
          zIndex: 500,
          transition: 'width 0.08s linear',
          boxShadow: `0 0 12px rgba(0,212,255,0.7)`,
          pointerEvents: 'none',
        }}
      />

      {/* Nav pill */}
      <nav
        aria-label="Page navigation"
        style={{
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: mounted
            ? 'translateX(-50%) translateY(0) scale(1)'
            : 'translateX(-50%) translateY(-72px) scale(0.9)',
          opacity: mounted ? 1 : 0,
          zIndex: 400,
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '7px 14px',
          background: 'rgba(0, 6, 18, 0.8)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderRadius: '100px',
          border: '1px solid rgba(0, 212, 255, 0.14)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03) inset',
          transition:
            'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100vw - 40px)',
        }}
      >
        <LogoButton />
        <Divider />

        {isHome ? (
          HOME_SECTIONS.map((id) => (
            <NavBtn
              key={id}
              label={id}
              active={displayActive === id}
              onClick={() => scrollTo(id)}
            />
          ))
        ) : (
          <Breadcrumb location={location} />
        )}

        <Divider />
        <NavLink to="/projects" label="projects" active={isProjects} hobby />
        <NavLink to="/cheat-sheets" label="cheat sheets" active={isCheatSheets} hobby />
      </nav>
    </>
  )
}
