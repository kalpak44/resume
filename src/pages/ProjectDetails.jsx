import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Markdown } from '../components/Markdown.jsx'
import gsap from 'gsap'
import { projects } from '../data/projects.js'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  text: '#f1f5f9',
  muted: '#64748b',
  subtle: '#94a3b8',
  sky: '#7dd3fc',
  bg: '#000814',
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
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          width: '13px', height: '13px', borderRadius: '50%',
          background: '#ff5f57', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'box-shadow 0.2s',
          boxShadow: hovered ? '0 0 8px rgba(255,95,87,0.6)' : 'none',
        }}
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 12 12" fill="none" stroke="#8d0e0a" strokeWidth="1.8">
            <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <button
        type="button"
        aria-label="Minimize"
        style={{
          width: '13px', height: '13px', borderRadius: '50%',
          background: '#febc2e', border: 'none', cursor: 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 12 12" fill="none" stroke="#8d6302" strokeWidth="1.8">
            <path d="M2 6h8" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <button
        type="button"
        aria-label="Maximize"
        style={{
          width: '13px', height: '13px', borderRadius: '50%',
          background: '#28c840', border: 'none', cursor: 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 12 12" fill="none" stroke="#0d5215" strokeWidth="1.8">
            <path d="M2 6h8M6 2v8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  )
}

export function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    if (!project) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.cin-page-card',
      { opacity: 0, y: 36, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1 }
    )
  }, [project])

  if (!project) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px',
          color: C.subtle,
        }}
      >
        <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Project not found</p>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: C.cyan,
            cursor: 'pointer',
            fontSize: '0.95rem',
            textDecoration: 'underline',
          }}
        >
          Back to resume
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header card */}
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
            {project.title}
          </span>
        </div>

        <div style={{ padding: '28px 32px' }}>
          {/* Title row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <h1
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: C.text,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {project.title}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkBtnStyle(C.cyan)}
                  onMouseEnter={linkHoverIn(C.cyan)}
                  onMouseLeave={linkHoverOut(C.cyan)}
                >
                  <i className="fab fa-github" />
                  GitHub
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkBtnStyle(C.purple)}
                  onMouseEnter={linkHoverIn(C.purple)}
                  onMouseLeave={linkHoverOut(C.purple)}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Markdown */}
          <Markdown content={project.details ?? ''} />

          {/* Tech pills */}
          {project.technologies?.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <p
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: C.cyan,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  marginBottom: '12px',
                }}
              >
                Technologies Used
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.18)',
                      color: C.sky,
                      fontSize: '0.78rem',
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '16px' }}>
        <button
          onClick={() => navigate(-1)}
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
          <i
            className="fa-solid fa-arrow-left"
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
          />
          Back to Resume
        </button>
      </div>
    </div>
  )
}

// ── Style helpers ──────────────────────────────────────────

function linkBtnStyle(color) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '8px 18px',
    borderRadius: '10px',
    background: color + '12',
    border: `1px solid ${color}28`,
    color: C.text,
    fontSize: '0.85rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
  }
}

function linkHoverIn(color) {
  return (e) => {
    e.currentTarget.style.background = color + '25'
    e.currentTarget.style.borderColor = color + '55'
    e.currentTarget.style.transform = 'translateY(-2px)'
    e.currentTarget.style.boxShadow = `0 4px 18px ${color}28`
  }
}
function linkHoverOut(color) {
  return (e) => {
    e.currentTarget.style.background = color + '12'
    e.currentTarget.style.borderColor = color + '28'
    e.currentTarget.style.transform = 'translateY(0)'
    e.currentTarget.style.boxShadow = 'none'
  }
}