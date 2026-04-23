import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { StarField } from '../components/StarField.jsx'
import { CinematicNav } from '../components/CinematicNav.jsx'
import { profile } from '../data/profile.js'

// ── Design tokens ──────────────────────────────────────────
const C = {
  bg: '#000814',
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  pink: '#f472b6',
  text: '#f1f5f9',
  muted: '#64748b',
  subtle: '#94a3b8',
  sky: '#7dd3fc',
}

// Skill categories extracted from profile experience data
const SKILLS = [
  {
    label: 'Backend',
    color: C.cyan,
    items: [
      'Java',
      'Spring Boot',
      'Spark Java',
      'Node.js',
      'Express JS',
      'Microservices',
      'ETL',
      'REST APIs',
      '3rd Party Integrations',
      'commercetools',
      'Azure DevOps APIs',
      'Stripe',
      'Google Calendar API',
    ],
  },
  {
    label: 'Frontend',
    color: C.purple,
    items: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Bootstrap CSS',
      'Webpack',
      'JSLint',
      'WebSockets',
    ],
  },
  {
    label: 'Cloud & DevOps',
    color: '#10b981',
    items: [
      'AWS',
      'Azure',
      'Kubernetes',
      'Docker',
      'Terraform',
      'Jenkins',
      'CI/CD',
      'GitLab CI/CD',
      'Azure DevOps',
      'Azure Container Apps',
      'Azure Event Grid',
      'Helm',
      'FluxCD',
      'GitOps',
    ],
  },
  {
    label: 'Data & Storage',
    color: '#f59e0b',
    items: [
      'MongoDB',
      'PostgreSQL',
      'MariaDB',
      'Oracle',
      'AWS S3',
      'Azure Blob Storage',
      'Azure Storage Queue',
    ],
  },
  {
    label: 'Web3 & Other',
    color: C.pink,
    items: [
      'Web3',
      'Solidity',
      'Smart Contracts',
      'MCP',
      'Claude Code',
      'Codex',
      'Ollama',
      'n8n Flows',
    ],
  },
]

// ── Shared utilities ───────────────────────────────────────

function SplitChars({ text }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="cin-char"
          style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

function SectionLabel({ num, title }) {
  return (
    <div className="cin-reveal" style={{ marginBottom: '56px' }}>
      <p
        style={{
          color: C.cyan,
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
          marginBottom: '14px',
          margin: '0 0 14px',
        }}
      >
        — {num} —
      </p>
      <h2
        className="cin-section-heading"
        style={{
          fontSize: 'clamp(44px, 8vw, 82px)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 0.95,
          color: C.text,
          margin: '0 0 18px',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '56px',
          height: '3px',
          background: `linear-gradient(90deg, ${C.cyan}, ${C.purple})`,
          borderRadius: '2px',
        }}
      />
    </div>
  )
}

// ── Hero Section ───────────────────────────────────────────

function HeroSection({ profile }) {
  const linkedIn = profile.buttons.find((b) => b.text === 'LinkedIn')?.href
  const github = profile.buttons.find((b) => b.text === 'GitHub')?.href
  const resume = profile.buttons.find((b) => b.text === 'Resume')?.href

  return (
    <section
      id="hero"
      className="cin-snap-section"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,60px) 60px',
        background:
          'radial-gradient(ellipse at 50% 45%, rgba(0,40,100,0.45) 0%, rgba(0,8,20,0.8) 65%, rgba(0,8,20,0.98) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Central glow blobs with parallax */}
      <div
        className="cin-hero-blob-1"
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,100,220,0.13) 0%, rgba(0,50,150,0.06) 40%, transparent 70%)',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
      <div
        className="cin-hero-blob-2"
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          top: '55%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <p
        className="cin-hero-label"
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: C.cyan,
          marginBottom: '28px',
          fontFamily: 'monospace',
        }}
      >
        Software Engineer · Java Specialist · Builder
      </p>

      {/* Name — split into animated characters */}
      <div
        className="cin-hero-name"
        style={{
          lineHeight: 0.9,
          marginBottom: '28px',
          perspective: '800px',
        }}
      >
        <div
          style={{
            fontSize: 'clamp(52px, 9vw, 118px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            display: 'block',
            color: C.text,
            whiteSpace: 'nowrap',
          }}
        >
          <SplitChars text="PAVEL USANLI" />
        </div>
        <div
          style={{
            fontSize: 'clamp(52px, 9vw, 118px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            display: 'block',
            background: `linear-gradient(135deg, ${C.cyan} 0%, #0080ff 50%, ${C.purple} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            whiteSpace: 'nowrap',
          }}
        >
          <SplitChars text="USANLI" />
        </div>
      </div>

      {/* Tagline */}
      <p
        className="cin-hero-subtitle"
        style={{
          fontSize: 'clamp(0.95rem, 1.8vw, 1.18rem)',
          color: C.subtle,
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '48px',
        }}
      >
        Building complete, reliable systems end-to-end - from backend microservices and APIs to
        infrastructure and CI/CD.
      </p>

      {/* CTAs */}
      <div
        className="cin-hero-ctas"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '80px',
        }}
      >
        <HeroBtn href={linkedIn} icon="fab fa-linkedin" label="LinkedIn" primary />
        <HeroBtn href={github} icon="fab fa-github" label="GitHub" />
        <HeroBtn href={resume} icon="fa-solid fa-download" label="Resume" />
      </div>

      {/* Scroll indicator */}
      <div
        className="cin-scroll-ind"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: C.muted,
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'monospace',
        }}
      >
        <span>Scroll</span>
        <span
          style={{
            display: 'inline-block',
            animation: 'cinBounce 2s infinite ease-in-out',
            fontSize: '1.1rem',
          }}
        >
          ↓
        </span>
      </div>
    </section>
  )
}

function HeroBtn({ href, icon, label, primary }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        padding: '13px 26px',
        borderRadius: '13px',
        border: primary ? 'none' : '1px solid rgba(255,255,255,0.14)',
        background: primary
          ? `linear-gradient(135deg, ${C.cyan} 0%, #0080ff 100%)`
          : 'rgba(255,255,255,0.05)',
        color: C.text,
        fontWeight: 600,
        fontSize: '0.9rem',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: primary ? `0 0 32px rgba(0, 212, 255, 0.22)` : 'none',
        backdropFilter: 'blur(10px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
        e.currentTarget.style.boxShadow = primary
          ? `0 0 50px rgba(0,212,255,0.42)`
          : '0 6px 24px rgba(0,0,0,0.35)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = primary ? `0 0 32px rgba(0, 212, 255, 0.22)` : 'none'
      }}
    >
      <i className={icon} aria-hidden="true" />
      {label}
    </a>
  )
}

// ── About Section ──────────────────────────────────────────

function AboutSection({ profile }) {
  return (
    <section
      id="about"
      className="cin-snap-section"
      style={{
        height: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'rgba(0, 8, 20, 0.93)',
        borderTop: '1px solid rgba(0, 212, 255, 0.07)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
        <SectionLabel num="01" title="ABOUT" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Summary + contact */}
          <div className="cin-reveal">
            <p
              style={{
                fontSize: 'clamp(0.97rem, 1.4vw, 1.1rem)',
                lineHeight: 1.88,
                color: '#cbd5e1',
                marginBottom: '36px',
              }}
            >
              {profile.summary}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {profile.meta.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '11px',
                      background: 'rgba(0, 212, 255, 0.09)',
                      border: '1px solid rgba(0, 212, 255, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <i className={item.icon} style={{ color: C.cyan, fontSize: '0.85rem' }} />
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      style={{
                        color: '#cbd5e1',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.cyan)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats + buttons */}
          <div className="cin-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              {
                num: '10+',
                label: 'Years of Experience',
                desc: 'From writing ERP components to building cloud-native systems',
                color: C.cyan,
              },
              {
                num: '4',
                label: 'Companies',
                desc: 'Methodia → Intershop → foryouandyourcustomers + Ispolink (concurrent)',
                color: C.purple,
              },
              {
                num: '∞',
                label: 'Curiosity',
                desc: 'Always experimenting — Web3, GitOps, Raspberry Pi bots, homelab K8s',
                color: C.pink,
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '22px 26px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${stat.color}1a`,
                  transition: 'border-color 0.3s, background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = stat.color + '40'
                  e.currentTarget.style.background = stat.color + '07'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = stat.color + '1a'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                    fontWeight: 800,
                    color: stat.color,
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: '5px',
                    fontSize: '0.95rem',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.82rem', color: C.muted, lineHeight: 1.55 }}>
                  {stat.desc}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
              {profile.buttons.map((btn, i) => (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '11px',
                    border: btn.class.includes('btn-primary')
                      ? 'none'
                      : '1px solid rgba(255,255,255,0.13)',
                    background: btn.class.includes('btn-primary')
                      ? `linear-gradient(135deg, ${C.cyan}, #0080ff)`
                      : 'rgba(255,255,255,0.05)',
                    color: C.text,
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'transform 0.2s',
                    boxShadow: btn.class.includes('btn-primary')
                      ? '0 0 20px rgba(0,212,255,0.2)'
                      : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {btn.icon && <i className={btn.icon} aria-hidden="true" />}
                  {btn.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Experience Section ─────────────────────────────────────

const EXP_COLORS = [C.cyan, C.purple, '#10b981', C.pink]

function ExperienceSection({ experience, onRegisterNav }) {
  const activeIdxRef = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const isTransitioningRef = useRef(false)
  const cardRefs = useRef([])

  const parseJob = (meta) => {
    const company = meta.split(',')[0].trim()
    const rest = meta.split(',').slice(1).join(',').trim()
    const locMatch = rest.match(/^([^(]+)\((.+)\)$/)
    const location = locMatch ? locMatch[1].trim() : ''
    const paren = locMatch ? locMatch[2].trim() : rest
    const parenParts = paren.split(',').map((s) => s.trim())
    const type = parenParts[0] || ''
    const period = parenParts.slice(1).join(', ').trim()
    return { company, location, type, period }
  }

  const animateCardContent = (card) => {
    if (!card || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const company = card.querySelector('.exp-company')
    const role = card.querySelector('.exp-role')
    const meta = card.querySelector('.exp-meta')
    const bullets = card.querySelectorAll('.exp-bullet')
    const pills = card.querySelectorAll('.exp-pill')
    if (company) gsap.fromTo(company, { opacity: 0, y: 24 }, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.05,
    })
    if (role) gsap.fromTo(role, { opacity: 0, x: -28 }, {
      opacity: 1,
      x: 0,
      duration: 0.55,
      ease: 'power3.out',
      delay: 0.18,
    })
    if (meta) gsap.fromTo(meta, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.28 })
    if (bullets.length) gsap.fromTo(bullets, { opacity: 0, x: 28 }, {
      opacity: 1,
      x: 0,
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.07,
      delay: 0.32,
    })
    if (pills.length) gsap.fromTo(pills, { opacity: 0, scale: 0.75 }, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'back.out(1.6)',
      stagger: 0.04,
      delay: 0.55,
    })
  }

  const resetCardContent = (card) => {
    if (!card) return
    card.querySelectorAll('.exp-company,.exp-role,.exp-meta,.exp-bullet,.exp-pill')
      .forEach((el) => gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 1 }))
  }

  const animateTo = (nextIdx, dir) => {
    if (isTransitioningRef.current) return false
    if (nextIdx < 0 || nextIdx >= experience.length) return false
    const curIdx = activeIdxRef.current
    if (nextIdx === curIdx) return false

    isTransitioningRef.current = true
    const curCard = cardRefs.current[curIdx]
    const nextCard = cardRefs.current[nextIdx]
    // Forward (dir > 0): current exits left, next enters from right
    // Backward (dir < 0): current exits right, next enters from left
    const outX = dir > 0 ? '-105%' : '105%'
    const inFromX = dir > 0 ? '105%' : '-105%'

    resetCardContent(nextCard)
    gsap.set(nextCard, { x: inFromX })
    gsap.to(curCard, { x: outX, duration: 0.62, ease: 'power3.inOut' })
    gsap.to(nextCard, {
      x: '0%',
      duration: 0.62,
      ease: 'power3.inOut',
      onComplete: () => {
        isTransitioningRef.current = false
        activeIdxRef.current = nextIdx
        setActiveIdx(nextIdx)
        animateCardContent(nextCard)
      },
    })
    return true
  }

  useEffect(() => {
    // Initial card positions — first card visible, rest to the right (off-screen)
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { x: i === 0 ? '0%' : '105%' })
      if (i !== 0) resetCardContent(card)
    })

    // Register goTo with parent so wheel/touch can drive card changes
    if (onRegisterNav) {
      onRegisterNav((dir) => {
        const next = activeIdxRef.current + dir
        if (next < 0 || next >= experience.length) return false
        // While a transition is running, consume the event but don't act
        if (isTransitioningRef.current) return true
        return animateTo(next, dir)
      })
    }

    // Animate first card content when section enters viewport
    const section = document.getElementById('experience')
    if (!section) return
    let fired = false
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true
          animateCardContent(cardRefs.current[0])
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="experience"
      className="cin-snap-section exp-section"
      style={{
        height: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(0, 5, 16, 0.96)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        overflow: 'hidden',
      }}
    >
      {/* Persistent header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(28px, 4vw, 44px) clamp(24px, 6vw, 80px) 0',
          flexShrink: 0,
        }}
      >
        <div>
          <p style={{
            color: C.cyan, fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            fontFamily: 'monospace', marginBottom: '8px',
          }}>
            — 02 —
          </p>
          <h2 className="cin-section-heading" style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: 0.95, color: C.text, margin: 0,
          }}>
            EXPERIENCE
          </h2>
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {experience.map((_, i) => {
            const color = EXP_COLORS[i % EXP_COLORS.length]
            const active = i === activeIdx
            return (
              <button
                key={i}
                aria-label={`Job ${i + 1}`}
                onClick={() => animateTo(i, i > activeIdxRef.current ? 1 : -1)}
                style={{
                  width: active ? '22px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  background: active ? color : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s',
                  boxShadow: active ? `0 0 10px ${color}88` : 'none',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Stacked cards — absolutely positioned, GSAP drives transitions */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', marginTop: '20px' }}>
        {experience.map((job, idx) => {
          const { company, location, type, period } = parseJob(job.meta)
          const color = EXP_COLORS[idx % EXP_COLORS.length]
          const allTags = [...new Set([...(job.tags || []), ...(job.technologies || []), ...(job.skills || [])])]

          return (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="exp-snap-card"
              style={{
                position: 'absolute',
                inset: 0,
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,212,255,0.15) transparent',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  padding: '16px clamp(24px, 6vw, 80px) 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '100%',
                  maxWidth: '920px',
                  margin: '0 auto',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Company name */}
                <div
                  className="exp-company"
                  style={{
                    fontSize: 'clamp(1.6rem, 3.8vw, 2.6rem)',
                    fontWeight: 800,
                    color: color,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                    textShadow: `0 0 40px ${color}44`,
                  }}
                >
                  {company}
                </div>

                {/* Role */}
                <div
                  className="exp-role"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: '8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {job.title}
                </div>

                {/* Meta */}
                <div
                  className="exp-meta"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px 18px',
                    fontSize: '0.82rem',
                    color: C.muted,
                    marginBottom: '20px',
                  }}
                >
                  {location && <span><i className="fa-solid fa-location-dot"
                                        style={{ marginRight: '5px', color: color + 'aa' }} />{location}</span>}
                  {type && <span><i className="fa-solid fa-briefcase"
                                    style={{ marginRight: '5px', color: color + 'aa' }} />{type}</span>}
                  {period && <span><i className="fa-solid fa-calendar"
                                      style={{ marginRight: '5px', color: color + 'aa' }} />{period}</span>}
                </div>

                {/* Gradient divider */}
                <div style={{
                  width: '56px',
                  height: '2px',
                  background: `linear-gradient(90deg, ${color}, transparent)`,
                  borderRadius: '1px',
                  marginBottom: '22px',
                }} />

                {/* Bullets */}
                {job.bullets?.length > 0 && (
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '9px',
                  }}>
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="exp-bullet"
                        style={{
                          display: 'flex',
                          gap: '12px',
                          fontSize: 'clamp(0.82rem, 1.3vw, 0.92rem)',
                          color: C.subtle,
                          lineHeight: 1.65,
                        }}
                      >
                        <span style={{ color, flexShrink: 0, fontSize: '0.65rem', marginTop: '5px' }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech pills */}
                {allTags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {allTags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="exp-pill"
                        style={{
                          padding: '3px 11px',
                          borderRadius: '6px',
                          background: color + '12',
                          border: `1px solid ${color}28`,
                          color: C.sky,
                          fontSize: '0.72rem',
                          fontWeight: 500,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Skills Section ─────────────────────────────────────────

function SkillsSection() {
  return (
    <section
      id="skills"
      className="cin-snap-section"
      style={{
        height: '100vh',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px)',
        background: 'rgba(4, 0, 18, 0.95)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1080px', margin: '0 auto', width: '100%' }}>
        <SectionLabel num="03" title="SKILLS" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '22px',
          }}
        >
          {SKILLS.map((cat, ci) => (
            <div
              key={ci}
              className="cin-skill-cat"
              style={{
                padding: '26px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.022)',
                border: `1px solid ${cat.color}1e`,
                transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = cat.color + '45'
                e.currentTarget.style.background = cat.color + '07'
                e.currentTarget.style.boxShadow = `0 0 40px ${cat.color}0f, inset 0 0 50px ${cat.color}05`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = cat.color + '1e'
                e.currentTarget.style.background = 'rgba(255,255,255,0.022)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '18px',
                }}
              >
                <div
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    background: cat.color,
                    boxShadow: `0 0 10px ${cat.color}cc`,
                    flexShrink: 0,
                  }}
                />
                <h3
                  style={{
                    fontWeight: 700,
                    color: cat.color,
                    fontSize: '0.78rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {cat.label}
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {cat.items.map((skill, si) => (
                  <span
                    key={si}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: cat.color + '11',
                      border: `1px solid ${cat.color}26`,
                      color: C.text,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      transition: 'background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = cat.color + '28'
                      e.currentTarget.style.borderColor = cat.color + '65'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = `0 4px 14px ${cat.color}33`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = cat.color + '11'
                      e.currentTarget.style.borderColor = cat.color + '26'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects Section ───────────────────────────────────────

// ── Contact Section ────────────────────────────────────────

function ContactSection({ profile }) {
  const emailMeta = profile.meta.find((m) => m.link?.startsWith('mailto:'))
  const linkedIn = profile.buttons.find((b) => b.text === 'LinkedIn')?.href
  const github = profile.buttons.find((b) => b.text === 'GitHub')?.href
  const edu = profile.education[0]

  return (
    <section
      id="contact"
      className="cin-snap-section"
      style={{
        height: '100vh',
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 6vw, 80px) 48px',
        background: 'rgba(0, 8, 20, 0.88)',
        borderTop: '1px solid rgba(255,255,255,0.045)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Central glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,80,200,0.09) 0%, rgba(80,0,180,0.05) 50%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', maxWidth: '760px', width: '100%' }}>
        <div className="cin-reveal">
          <p
            style={{
              color: C.cyan,
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
              marginBottom: '20px',
            }}
          >
            — 04 —
          </p>

          <h2
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: C.text,
              marginBottom: '4px',
              letterSpacing: '-0.025em',
            }}
          >
            Let&apos;s Build
          </h2>
          <h2
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.4rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              marginBottom: '40px',
              background: `linear-gradient(135deg, ${C.cyan} 0%, #0080ff 45%, ${C.purple} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Something Great
          </h2>

          {emailMeta && (
            <a
              href={emailMeta.link}
              style={{
                display: 'inline-block',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.3rem)',
                color: C.text,
                textDecoration: 'none',
                marginBottom: '48px',
                padding: '16px 32px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                fontFamily: 'monospace',
                letterSpacing: '0.02em',
                transition: 'border-color 0.3s, background 0.3s, color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.45)'
                e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
                e.currentTarget.style.color = C.cyan
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.color = C.text
              }}
            >
              {emailMeta.text}
            </a>
          )}

          {/* Social / nav links */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '56px',
              flexWrap: 'wrap',
            }}
          >
            {linkedIn && <SocialBtn href={linkedIn} icon="fab fa-linkedin" label="LinkedIn" color={C.cyan} />}
            {github && <SocialBtn href={github} icon="fab fa-github" label="GitHub" color={C.purple} />}
            <Link
              to="/cheat-sheets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 22px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: C.text,
                fontWeight: 500,
                fontSize: '0.88rem',
                textDecoration: 'none',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              <i className="fa-solid fa-book" />
              Cheat Sheets
            </Link>
          </div>

          {/* Education */}
          {edu && (
            <div
              style={{
                padding: '22px 28px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.028)',
                border: '1px solid rgba(255,255,255,0.065)',
                marginBottom: '48px',
                textAlign: 'left',
                maxWidth: '460px',
                margin: '0 auto 48px',
              }}
            >
              <p
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: C.cyan,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  marginBottom: '10px',
                }}
              >
                Education
              </p>
              <div style={{ fontWeight: 700, color: C.text, marginBottom: '3px' }}>
                {edu.school}
              </div>
              <div
                style={{ color: C.purple, fontWeight: 500, marginBottom: '3px', fontSize: '0.88rem' }}
              >
                {edu.degree}
              </div>
              {edu.faculty && (
                <div style={{ color: C.muted, fontSize: '0.82rem' }}>{edu.faculty}</div>
              )}
            </div>
          )}

          <p style={{ color: C.muted, fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} {profile.name} · Sofia, Bulgaria
          </p>
        </div>
      </div>
    </section>
  )
}

function SocialBtn({ href, icon, label, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 22px',
        borderRadius: '12px',
        background: color + '10',
        border: `1px solid ${color}2e`,
        color: C.text,
        fontWeight: 500,
        fontSize: '0.88rem',
        textDecoration: 'none',
        transition: 'transform 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.background = color + '22'
        e.currentTarget.style.borderColor = color + '55'
        e.currentTarget.style.boxShadow = `0 4px 22px ${color}28`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.background = color + '10'
        e.currentTarget.style.borderColor = color + '2e'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <i className={icon} />
      {label}
    </a>
  )
}

// ── Loading screen ─────────────────────────────────────────

function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: C.bg,
        color: C.cyan,
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            animation: 'cinPulse 1.4s infinite ease-in-out',
            marginBottom: '16px',
            fontSize: '2rem',
          }}
        >
          ◈
        </div>
        Loading…
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────

const SNAP_SECTIONS = ['hero', 'about', 'experience', 'skills', 'contact']

export function CinematicResume() {
  const mainRef = useRef(null)
  const currentIdxRef = useRef(0)
  const isScrollingRef = useRef(false)
  const expGoToRef = useRef(null)   // set by ExperienceSection via onRegisterNav

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document
        .querySelectorAll(
          '.cin-char,.cin-hero-label,.cin-hero-subtitle,.cin-hero-ctas,.cin-scroll-ind,.cin-reveal,.cin-job-card,.cin-skill-cat,.cin-section-heading',
        )
        .forEach((el) => {
          el.style.opacity = '1'
          el.style.transform = 'none'
          el.style.clipPath = 'none'
        })
      return
    }

    const ctx = gsap.context(() => {
      // Hero — character reveal
      gsap.fromTo(
        '.cin-char',
        { opacity: 0, y: 55, rotateX: -75 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.72, stagger: 0.032, ease: 'back.out(1.4)', delay: 0.25 },
      )
      gsap.to('.cin-hero-label', { opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.15 })
      gsap.to('.cin-hero-subtitle', { opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.4 })
      gsap.to('.cin-hero-ctas', { opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.7 })
      gsap.to('.cin-scroll-ind', { opacity: 1, duration: 0.6, ease: 'power3.out', delay: 2.1 })

      // Hero — continuous name float
      gsap.to('.cin-hero-name', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2.2 })
    }, mainRef)

    // ── Per-section snap reveals (IntersectionObserver) ────

    const root = mainRef.current
    const observers = []

    const onSnap = (sectionId, fn) => {
      const section = document.getElementById(sectionId)
      if (!section) return
      let fired = false
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !fired) {
            fired = true
            fn()
          }
        },
        { root, threshold: 0.3 },
      )
      obs.observe(section)
      observers.push(obs)
    }

    onSnap('about', () => {
      gsap.fromTo('#about .cin-section-heading',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power4.out' })
      gsap.utils.toArray('#about .cin-reveal').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out', delay: i * 0.13 })
      })
    })

    onSnap('experience', () => {
      gsap.fromTo('#experience .cin-section-heading',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power4.out' })
    })

    onSnap('skills', () => {
      gsap.fromTo('#skills .cin-section-heading',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.9, ease: 'power4.out' })
      gsap.utils.toArray('.cin-skill-cat').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 36, rotateX: -12 },
          {
            opacity: 1, y: 0, rotateX: 0, duration: 0.65, ease: 'back.out(1.4)',
            delay: 0.1 + (i % 3) * 0.09 + Math.floor(i / 3) * 0.18,
          })
      })
    })

    onSnap('contact', () => {
      gsap.fromTo('#contact .cin-reveal', { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
    })

    // ── Custom wheel / touch navigation ───────────────────
    // Any downward scroll goes to the next section; upward goes back.
    // Experience is exempt while its inner container hasn't reached top/bottom.

    const container = mainRef.current

    const goTo = (idx) => {
      if (idx < 0 || idx >= SNAP_SECTIONS.length) return
      const el = document.getElementById(SNAP_SECTIONS[idx])
      if (!el) return
      isScrollingRef.current = true
      currentIdxRef.current = idx
      const elRect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      container.scrollBy({ top: elRect.top - containerRect.top, behavior: 'smooth' })
      setTimeout(() => {
        isScrollingRef.current = false
      }, 900)
    }

    const onWheel = (e) => {
      e.preventDefault()
      if (isScrollingRef.current) return
      const dir = e.deltaY > 5 ? 1 : e.deltaY < -5 ? -1 : 0
      if (dir === 0) return
      if (SNAP_SECTIONS[currentIdxRef.current] === 'experience' && expGoToRef.current) {
        const navigated = expGoToRef.current(dir)
        if (navigated) return
      }
      goTo(currentIdxRef.current + dir)
    }

    let touchStartY = 0
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const onTouchEnd = (e) => {
      if (isScrollingRef.current) return
      const dy = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(dy) < 30) return
      const dir = dy > 0 ? 1 : -1
      if (SNAP_SECTIONS[currentIdxRef.current] === 'experience' && expGoToRef.current) {
        const navigated = expGoToRef.current(dir)
        if (navigated) return
      }
      goTo(currentIdxRef.current + dir)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      observers.forEach((o) => o.disconnect())
      ctx.revert()
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <>
      <style>{`
        .cin-char { opacity: 0; transform-style: preserve-3d; backface-visibility: hidden; }
        .cin-hero-label { opacity: 0; }
        .cin-hero-subtitle { opacity: 0; }
        .cin-hero-ctas { opacity: 0; }
        .cin-scroll-ind { opacity: 0; }

        @keyframes cinBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        @keyframes cinPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.88); }
        }

        .cin-root { scrollbar-width: none; }
        .cin-root::-webkit-scrollbar { display: none; }
        .exp-snap-card::-webkit-scrollbar { width: 3px; }
        .exp-snap-card::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.2); border-radius: 2px; }

        @media (max-width: 600px) {
          nav[aria-label="Page navigation"] { display: none !important; }
        }

        /* Initial state for section headings (clip-path reveal) */
        .cin-section-heading { opacity: 0; }
        .cin-skill-cat { opacity: 0; }

        @media (prefers-reduced-motion: reduce) {
          .cin-char,
          .cin-hero-label,
          .cin-hero-subtitle,
          .cin-hero-ctas,
          .cin-scroll-ind,
          .cin-reveal,
          .cin-job-card,
          .cin-skill-cat,
          .cin-section-heading {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }
      `}</style>

      <div
        ref={mainRef}
        className="cin-root"
        style={{
          background: C.bg,
          color: C.text,
          height: '100vh',
          overflowY: 'scroll',
          position: 'relative',
          fontFamily: '\'Poppins\', system-ui, sans-serif',
        }}
      >
        <StarField />
        <CinematicNav />
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ExperienceSection experience={profile.experience} onRegisterNav={(fn) => {
          expGoToRef.current = fn
        }} />
        <SkillsSection />
        <ContactSection profile={profile} />
      </div>
    </>
  )
}