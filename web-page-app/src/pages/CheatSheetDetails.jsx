import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Markdown } from '../components/Markdown.jsx'
import gsap from 'gsap'
import { cheatsheets } from '../data/cheatsheets.js'
import { useIsMobile } from '../hooks/useIsMobile.js'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  text: '#f1f5f9',
  muted: '#64748b',
}

function WindowControls({ onClose }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ display: 'flex', gap: '7px', alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          width: '13px',
          height: '13px',
          borderRadius: '50%',
          background: '#ff5f57',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered ? '0 0 8px rgba(255,95,87,0.6)' : 'none',
          transition: 'box-shadow 0.2s',
        }}
      >
        {hovered && (
          <svg
            width="6"
            height="6"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#8d0e0a"
            strokeWidth="1.8"
          >
            <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {['#febc2e', '#28c840'].map((color, i) => (
        <button
          key={i}
          type="button"
          aria-label={['Minimize', 'Maximize'][i]}
          style={{
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            background: color,
            border: 'none',
            cursor: 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      ))}
    </div>
  )
}

export function CheatSheetDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const cheatsheet = cheatsheets.find((c) => c.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (isMobile) return
    if (!cheatsheet) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.cin-page-card',
      { opacity: 0, y: 36, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
    )
  }, [cheatsheet, isMobile])

  if (!cheatsheet) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: '#94a3b8' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Cheat sheet not found</p>
        <button
          onClick={() => navigate('/cheat-sheets')}
          style={{
            background: 'none',
            border: 'none',
            color: C.cyan,
            cursor: 'pointer',
            fontSize: '0.95rem',
            textDecoration: 'underline',
          }}
        >
          Cheat Sheet List
        </button>
      </div>
    )
  }

  // ── iOS layout ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <div>
        {/* Back button */}
        <button
          onClick={() => navigate('/cheat-sheets')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: C.cyan,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 500,
            padding: '0 0 16px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.5 1L1.5 7l5 6" />
          </svg>
          Cheat Sheets
        </button>

        {/* Title */}
        <h1
          style={{
            fontSize: '1.65rem',
            fontWeight: 700,
            color: C.text,
            margin: '0 0 12px',
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
          }}
        >
          {cheatsheet.title}
        </h1>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '24px',
          }}
        />

        {/* Markdown */}
        <Markdown content={cheatsheet.details ?? ''} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Main content card */}
      <div
        className="cin-page-card"
        style={{
          borderRadius: '18px',
          background: 'rgba(255,255,255,0.028)',
          border: '1px solid rgba(0,212,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
        }}
      >
        {/* Window bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderBottom: '1px solid rgba(0,212,255,0.07)',
            background: 'rgba(0,212,255,0.02)',
          }}
        >
          <WindowControls onClose={() => navigate('/cheat-sheets')} />
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.78rem',
              color: C.muted,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            cheat-sheets / {id}
          </span>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {/* Title */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <h1
                style={{
                  fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
                  fontWeight: 800,
                  color: C.text,
                  margin: 0,
                  letterSpacing: '-0.025em',
                }}
              >
                {cheatsheet.title}
              </h1>
            </div>
            <div
              style={{
                width: '48px',
                height: '2px',
                background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
                borderRadius: '1px',
                marginTop: '16px',
              }}
            />
          </div>

          {/* Markdown content */}
          <Markdown content={cheatsheet.details ?? ''} />
        </div>
      </div>

      {/* Back button */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '16px' }}>
        <button
          onClick={() => navigate('/cheat-sheets')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: C.muted,
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <i className="fa-solid fa-arrow-left" />
          Cheat Sheet List
        </button>
      </div>
    </div>
  )
}
