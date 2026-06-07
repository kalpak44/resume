import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { cheatsheets } from '../data/cheatsheets.js'
import { useIsMobile } from '../hooks/useIsMobile.js'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  pink: '#f472b6',
  text: '#f1f5f9',
  muted: '#64748b',
  subtle: '#94a3b8',
}

// macOS-style window controls
function WindowControls({ onClose }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ display: 'flex', gap: '7px', alignItems: 'center' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {[
        {
          color: '#ff5f57',
          glowColor: 'rgba(255,95,87,0.6)',
          icon: onClose ? (
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
          ) : null,
          onClick: onClose,
        },
        {
          color: '#febc2e',
          glowColor: null,
          icon: hovered ? (
            <svg
              width="6"
              height="6"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#8d6302"
              strokeWidth="1.8"
            >
              <path d="M2 6h8" strokeLinecap="round" />
            </svg>
          ) : null,
        },
        {
          color: '#28c840',
          glowColor: null,
          icon: hovered ? (
            <svg
              width="6"
              height="6"
              viewBox="0 0 12 12"
              fill="none"
              stroke="#0d5215"
              strokeWidth="1.8"
            >
              <path d="M2 6h8M6 2v8" strokeLinecap="round" />
            </svg>
          ) : null,
        },
      ].map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.onClick}
          aria-label={['Close', 'Minimize', 'Maximize'][i]}
          style={{
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            background: btn.color,
            border: 'none',
            cursor: btn.onClick ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered && btn.glowColor ? `0 0 8px ${btn.glowColor}` : 'none',
            transition: 'box-shadow 0.2s',
          }}
        >
          {hovered && btn.icon}
        </button>
      ))}
    </div>
  )
}

export function CheatSheets() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    if (!cheatsheets.length) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.cin-page-card',
      { opacity: 0, y: 32, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
    )
    gsap.fromTo(
      '.cin-sheet-item',
      { opacity: 0, x: -24 },
      {
        opacity: 1,
        x: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.045,
        delay: 0.2,
      }
    )
  }, [isMobile])

  if (!cheatsheets.length) return null

  // ── iOS layout ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <style>{`
          .ios-sheet-row { -webkit-tap-highlight-color: transparent; transition: background 0.12s; }
          .ios-sheet-row:active { background: rgba(255,255,255,0.09) !important; }
        `}</style>
        <div>
          {/* Large title */}
          <div style={{ marginBottom: '28px' }}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: C.cyan,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                margin: '0 0 8px',
              }}
            >
              Knowledge Base
            </p>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: C.text,
                margin: 0,
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Cheat Sheets
            </h1>
          </div>

          {/* Inset grouped list */}
          <div
            style={{
              borderRadius: '13px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {cheatsheets.map((sheet, idx) => (
              <Link
                key={sheet.id}
                to={`/cheat-sheets/${sheet.id}`}
                className="ios-sheet-row"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '13px',
                  padding: '12px 16px',
                  textDecoration: 'none',
                  background: 'transparent',
                }}
              >
                {/* App icon */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '9px',
                    background:
                      'linear-gradient(135deg, rgba(0,212,255,0.22), rgba(139,92,246,0.22))',
                    border: '1px solid rgba(0,212,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i
                    className="fa-solid fa-book"
                    style={{ color: C.cyan, fontSize: '0.82rem' }}
                  />
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: C.text,
                      lineHeight: 1.3,
                    }}
                  >
                    {sheet.title}
                  </div>
                  {sheet.summary && (
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: C.subtle,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginTop: '2px',
                      }}
                    >
                      {sheet.summary}
                    </div>
                  )}
                </div>
                {/* Disclosure chevron */}
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M1 1l5 5-5 5" />
                </svg>
                {/* Inset separator */}
                {idx < cheatsheets.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '67px',
                      right: 0,
                      height: '1px',
                      background: 'rgba(255,255,255,0.07)',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }

  const handleTilt = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.025) translateZ(10px)`
  }
  const resetTilt = (e) => {
    e.currentTarget.style.transform =
      'perspective(900px) rotateX(0) rotateY(0) scale(1) translateZ(0)'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Main card */}
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
          <WindowControls onClose={() => navigate('/')} />
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.78rem',
              color: C.muted,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
            }}
          >
            cheat-sheets
          </span>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {/* Section heading */}
          <div style={{ marginBottom: '28px' }}>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: C.cyan,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                marginBottom: '10px',
              }}
            >
              Knowledge Base
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: C.text,
                letterSpacing: '-0.025em',
                margin: '0 0 8px',
              }}
            >
              Cheat Sheets
            </h1>
            <div
              style={{
                width: '48px',
                height: '2px',
                background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
                borderRadius: '1px',
              }}
            />
          </div>

          {/* Sheet items */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {cheatsheets.map((sheet) => (
              <div
                key={sheet.id}
                className="cin-sheet-item"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <Link
                  to={`/cheat-sheets/${sheet.id}`}
                  aria-label={`Open ${sheet.title}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      padding: '18px 20px',
                      borderRadius: '13px',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(0,212,255,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition:
                        'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                      e.currentTarget.style.background = 'rgba(0,212,255,0.04)'
                      e.currentTarget.style.boxShadow =
                        '0 0 40px rgba(0,212,255,0.06), inset 0 0 50px rgba(0,212,255,0.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.08)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '8px',
                        marginBottom: '7px',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          color: C.text,
                          margin: 0,
                          lineHeight: 1.35,
                          paddingRight: '8px',
                        }}
                      >
                        {sheet.title}
                      </h3>
                    </div>
                    {sheet.summary && (
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: C.subtle,
                          lineHeight: 1.6,
                          flex: 1,
                          margin: '0 0 14px',
                        }}
                      >
                        {sheet.summary.length > 100
                          ? sheet.summary.slice(0, 100) + '…'
                          : sheet.summary}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: C.cyan,
                        fontSize: '0.76rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>View details</span>
                      <i
                        className="fa-solid fa-arrow-right"
                        style={{ fontSize: '0.68rem' }}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back button */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '16px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: C.muted,
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <i className="fa-solid fa-arrow-left" />
          Back to Resume
        </Link>
      </div>
    </div>
  )
}
