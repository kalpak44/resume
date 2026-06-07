import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useIsMobile } from '../hooks/useIsMobile.js'

const C = {
  cyan: '#00d4ff',
  purple: '#8b5cf6',
  pink: '#f472b6',
  text: '#f1f5f9',
  muted: '#64748b',
  subtle: '#94a3b8',
}

const photos = [
  {
    id: 'look-for-interesting-natural-places',
    src: '/assets/photos/look-for-interesting-natural-places.webp',
    label: 'look-for-interesting-natural-places',
    description:
      "If there's a rock worth climbing, I'm already at the top. Technically trespassing, spiritually thriving.",
  },
  {
    id: 'sometimes-cooking',
    src: '/assets/photos/sometimes-cooking.webp',
    label: 'sometimes-cooking',
    description:
      "I cook deliciously — or at least I won't die of hunger. Southeast Asia certified, zero Michelin stars.",
  },
  {
    id: 'animal-friendly',
    src: '/assets/photos/animal-friendly.webp',
    label: 'animal-friendly',
    description:
      "Made a new friend. She weighs 3 tons, has better manners than most, and didn't even ask for my LinkedIn.",
  },
  {
    id: 'walk-a-lot',
    src: '/assets/photos/walk-a-lot.webp',
    label: 'walk-a-lot',
    description:
      'The map said easy trail. The sand dune filed a complaint. I filed one back with my legs the next morning.',
  },
  {
    id: 'somewhere-above-the-clouds',
    src: '/assets/photos/somewhere-above-the-clouds.webp',
    label: 'somewhere-above-the-clouds',
    description:
      "Climbed until the clouds became someone else's problem. Spoiler: the Wi-Fi doesn't reach up here, and that's the point.",
  },
  {
    id: 'apologies-to-vegans',
    src: '/assets/photos/apologies-to-vegans.webp',
    label: 'apologies-to-vegans',
    description:
      'Sincere apologies to vegans — and to the neighbors who had to smell this from three gardens away. Worth it.',
  },
  {
    id: 'who-needs-dessert',
    src: "/assets/photos/who-needs-dessert-when-there's-fruit.webp",
    label: "who-needs-dessert-when-there's-fruit",
    description: 'Found the source. Skipped the supermarket. Peaked as a human being.',
  },
  {
    id: 'my-cat-in-space-REALLY',
    src: '/assets/photos/my-cat-in-space-REALLY.webp',
    label: 'my-cat-in-space-REALLY',
    description:
      'My cat. In space. REALLY. Orbit achieved, zero interest shown. Some personalities transcend gravity.',
  },
]

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
          icon: (
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
          ),
          onClick: onClose,
        },
        {
          color: '#febc2e',
          glowColor: null,
          icon: (
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
          ),
        },
        {
          color: '#28c840',
          glowColor: null,
          icon: (
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
          ),
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

function NavArrow({ direction, onClick, disabled }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={disabled ? undefined : onClick}
      aria-label={direction === 'prev' ? 'Previous' : 'Next'}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '22px',
        height: '22px',
        borderRadius: '6px',
        border: '1px solid',
        borderColor: disabled
          ? 'rgba(255,255,255,0.06)'
          : hovered
            ? 'rgba(139,92,246,0.5)'
            : 'rgba(255,255,255,0.12)',
        background:
          hovered && !disabled ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'border-color 0.15s, background 0.15s',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <svg
        width="9"
        height="9"
        viewBox="0 0 10 10"
        fill="none"
        stroke={
          disabled
            ? 'rgba(255,255,255,0.18)'
            : hovered
              ? '#c4b5fd'
              : 'rgba(255,255,255,0.5)'
        }
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === 'prev' ? (
          <path d="M6.5 1.5L3 5l3.5 3.5" />
        ) : (
          <path d="M3.5 1.5L7 5l-3.5 3.5" />
        )}
      </svg>
    </button>
  )
}

function MobilePhotoViewer({
  photo,
  index,
  total,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onClose,
}) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        animation: 'viewerFadeIn 0.18s ease',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px',
          paddingTop: 'calc(14px + env(safe-area-inset-top))',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'monospace',
          }}
        >
          {index + 1} / {total}
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          ✕
        </button>
      </div>

      {/* Image */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {hasPrev && (
          <div
            onClick={onPrev}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '35%',
              zIndex: 2,
              WebkitTapHighlightColor: 'transparent',
            }}
          />
        )}
        {hasNext && (
          <div
            onClick={onNext}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: '35%',
              zIndex: 2,
              WebkitTapHighlightColor: 'transparent',
            }}
          />
        )}
        <img
          src={photo.src}
          alt={photo.label}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          padding: '14px 20px',
          paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
          flexShrink: 0,
        }}
      >
        <p
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.55,
            margin: 0,
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          {photo.description}
        </p>
      </div>
    </div>
  )
}

function PhotoViewer({ photo, index, total, hasPrev, hasNext, onPrev, onNext, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onPrev()
      if (e.key === 'ArrowRight' && hasNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext, hasPrev, hasNext])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,4,14,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        animation: 'viewerFadeIn 0.22s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '800px',
          width: '100%',
          borderRadius: '16px',
          background: 'rgba(8, 12, 28, 0.92)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow:
            '0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03) inset',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '11px 16px',
            borderBottom: '1px solid rgba(139,92,246,0.12)',
            background: 'rgba(139,92,246,0.04)',
            flexShrink: 0,
            gap: '8px',
          }}
        >
          {/* Left: traffic lights + nav arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1 }}>
            <WindowControls onClose={onClose} />
            <div
              style={{
                width: '1px',
                height: '12px',
                background: 'rgba(255,255,255,0.08)',
                margin: '0 2px',
              }}
            />
            <NavArrow direction="prev" onClick={onPrev} disabled={!hasPrev} />
            <NavArrow direction="next" onClick={onNext} disabled={!hasNext} />
          </div>

          {/* Center: filename — absolutely positioned so it's always truly centered */}
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
              fontSize: '0.75rem',
              color: C.muted,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              pointerEvents: 'none',
            }}
          >
            {photo.label}
          </span>

          {/* Right: counter */}
          <span
            style={{
              marginLeft: 'auto',
              fontSize: '0.68rem',
              color: C.muted,
              fontFamily: 'monospace',
              opacity: 0.7,
              zIndex: 1,
            }}
          >
            {index + 1} / {total}
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '28px 28px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <img
            src={photo.src}
            alt={photo.label}
            style={{
              maxHeight: '62vh',
              maxWidth: '100%',
              borderRadius: '9px',
              objectFit: 'contain',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            }}
          />
          <p
            style={{
              fontSize: '0.92rem',
              color: C.subtle,
              textAlign: 'center',
              lineHeight: 1.65,
              maxWidth: '500px',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {photo.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export function SideQuests() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [selectedIdx, setSelectedIdx] = useState(null)

  const handleClose = useCallback(() => setSelectedIdx(null), [])
  const handlePrev = useCallback(() => setSelectedIdx((i) => Math.max(0, i - 1)), [])
  const handleNext = useCallback(
    () => setSelectedIdx((i) => Math.min(photos.length - 1, i + 1)),
    []
  )

  useEffect(() => {
    if (isMobile) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo(
      '.cin-page-card',
      { opacity: 0, y: 32, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }
    )
    gsap.fromTo(
      '.cin-photo-item',
      { opacity: 0, y: 24, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.2,
      }
    )
  }, [isMobile])

  // ── iOS layout ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <style>{`
          @keyframes viewerFadeIn { from { opacity: 0; } to { opacity: 1; } }
          .ios-photo-cell { -webkit-tap-highlight-color: transparent; transition: opacity 0.15s; }
          .ios-photo-cell:active { opacity: 0.75 !important; }
        `}</style>
        <div>
          {/* Large title */}
          <div style={{ marginBottom: '20px' }}>
            <p
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: C.purple,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                margin: '0 0 8px',
              }}
            >
              Life · Beyond Code
            </p>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: C.text,
                margin: '0 0 6px',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
              }}
            >
              Side Quests
            </h1>
            <p
              style={{ fontSize: '0.85rem', color: C.subtle, margin: 0, lineHeight: 1.5 }}
            >
              Things I do when the terminal is closed.
            </p>
          </div>

          {/* 3-column photo grid (iOS Photos style) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="ios-photo-cell"
                onClick={() => setSelectedIdx(idx)}
                style={{ aspectRatio: '1', overflow: 'hidden', cursor: 'pointer' }}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedIdx !== null &&
          createPortal(
            <MobilePhotoViewer
              photo={photos[selectedIdx]}
              index={selectedIdx}
              total={photos.length}
              hasPrev={selectedIdx > 0}
              hasNext={selectedIdx < photos.length - 1}
              onPrev={handlePrev}
              onNext={handleNext}
              onClose={handleClose}
            />,
            document.body
          )}
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes viewerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .cin-photo-item:hover .cin-photo-thumb {
          border-color: rgba(139,92,246,0.45) !important;
          box-shadow: 0 8px 32px rgba(139,92,246,0.18), 0 0 0 1px rgba(139,92,246,0.2) !important;
          transform: translateY(-4px) scale(1.02) !important;
        }
        .cin-photo-item:hover .cin-photo-label {
          color: #c4b5fd !important;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          className="cin-page-card"
          style={{
            borderRadius: '18px',
            background: 'rgba(255,255,255,0.028)',
            border: '1px solid rgba(139,92,246,0.15)',
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
              borderBottom: '1px solid rgba(139,92,246,0.08)',
              background: 'rgba(139,92,246,0.02)',
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
              side-quests
            </span>
          </div>

          <div style={{ padding: '28px 32px' }}>
            {/* Heading */}
            <div style={{ marginBottom: '32px' }}>
              <p
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: C.purple,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  marginBottom: '10px',
                }}
              >
                Life · Beyond Code
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
                Side Quests
              </h1>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: C.subtle,
                  maxWidth: '480px',
                  lineHeight: 1.6,
                }}
              >
                Things I do when the terminal is closed and the laptop is shut.
              </p>
              <div
                style={{
                  width: '48px',
                  height: '2px',
                  background: `linear-gradient(90deg, ${C.purple}, ${C.pink})`,
                  borderRadius: '1px',
                  marginTop: '14px',
                }}
              />
            </div>

            {/* Photo grid - macOS Finder style */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '28px',
                paddingBottom: '4px',
                justifyContent: 'center',
              }}
            >
              {photos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className="cin-photo-item"
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '9px',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <div
                    className="cin-photo-thumb"
                    style={{
                      width: '160px',
                      height: '140px',
                      borderRadius: '11px',
                      overflow: 'hidden',
                      border: '1px solid rgba(139,92,246,0.15)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                      transition: 'border-color 0.22s, box-shadow 0.22s, transform 0.22s',
                      background: 'rgba(255,255,255,0.03)',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                  <span
                    className="cin-photo-label"
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'monospace',
                      color: C.muted,
                      letterSpacing: '0.02em',
                      textAlign: 'center',
                      maxWidth: '160px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.22s',
                    }}
                  >
                    {photo.label}
                  </span>
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
            onMouseEnter={(e) => (e.currentTarget.style.color = C.purple)}
            onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
          >
            <i className="fa-solid fa-arrow-left" />
            Back to Resume
          </Link>
        </div>
      </div>

      {selectedIdx !== null &&
        createPortal(
          <PhotoViewer
            photo={photos[selectedIdx]}
            index={selectedIdx}
            total={photos.length}
            hasPrev={selectedIdx > 0}
            hasNext={selectedIdx < photos.length - 1}
            onPrev={handlePrev}
            onNext={handleNext}
            onClose={handleClose}
          />,
          document.body
        )}
    </>
  )
}
