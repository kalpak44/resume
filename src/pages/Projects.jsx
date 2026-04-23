import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import gsap from 'gsap'
import { projects } from '../data/projects.js'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  pink: '#f472b6',
  text: '#f1f5f9',
  muted: '#64748b',
  subtle: '#94a3b8',
  sky: '#7dd3fc',
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
        >
          {hovered && (
            <svg
              width="6"
              height="6"
              viewBox="0 0 12 12"
              fill="none"
              stroke={i === 0 ? '#8d6302' : '#0d5215'}
              strokeWidth="1.8"
            >
              {i === 0 ? (
                <path d="M2 6h8" strokeLinecap="round" />
              ) : (
                <path d="M2 6h8M6 2v8" strokeLinecap="round" />
              )}
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

export function Projects() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!projects.length) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.cin-page-card',
      { opacity: 0, y: 32, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
    )
    gsap.fromTo(
      '.cin-proj-item',
      { opacity: 0, y: 24, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.18,
      }
    )
  }, [])

  if (!projects.length) return null

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
            projects
          </span>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: C.pink,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                marginBottom: '10px',
              }}
            >
              Side Work · Hobby
            </p>
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 800,
                color: C.text,
                letterSpacing: '-0.025em',
                margin: '0 0 10px',
              }}
            >
              Personal Projects
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                color: C.subtle,
                maxWidth: '480px',
                lineHeight: 1.6,
              }}
            >
              Experiments and hobby builds — not part of my main job, just things I enjoy
              building.
            </p>
            <div
              style={{
                width: '48px',
                height: '2px',
                background: `linear-gradient(90deg, ${C.pink}, ${C.purple})`,
                borderRadius: '1px',
                marginTop: '14px',
              }}
            />
          </div>

          {/* Project grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="cin-proj-item"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <Link
                  to={`/projects/${project.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      padding: '18px 20px',
                      borderRadius: '13px',
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(244,114,182,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition:
                        'border-color 0.25s, box-shadow 0.25s, background 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(244,114,182,0.32)'
                      e.currentTarget.style.background = 'rgba(244,114,182,0.04)'
                      e.currentTarget.style.boxShadow =
                        '0 0 40px rgba(244,114,182,0.06), inset 0 0 50px rgba(244,114,182,0.02)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(244,114,182,0.1)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {/* Corner number */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: C.muted,
                        fontFamily: 'monospace',
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <h3
                      style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: C.text,
                        marginBottom: '7px',
                        lineHeight: 1.35,
                        paddingRight: '24px',
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: C.subtle,
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: '14px',
                      }}
                    >
                      {project.summary.length > 100
                        ? project.summary.slice(0, 100) + '…'
                        : project.summary}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginBottom: '12px',
                      }}
                    >
                      {(project.technologies || []).slice(0, 4).map((tech, ti) => (
                        <span
                          key={ti}
                          style={{
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'rgba(244,114,182,0.08)',
                            border: '1px solid rgba(244,114,182,0.15)',
                            color: '#f9a8d4',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 4 && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: C.muted,
                            alignSelf: 'center',
                          }}
                        >
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: C.pink,
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

      {/* Back */}
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
          onMouseEnter={(e) => (e.currentTarget.style.color = C.pink)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          <i className="fa-solid fa-arrow-left" />
          Back to Resume
        </Link>
      </div>
    </div>
  )
}
