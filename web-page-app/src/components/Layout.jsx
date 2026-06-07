import { useEffect } from 'react'
import { StarField } from './StarField.jsx'
import { CinematicNav } from './CinematicNav.jsx'

export function Layout({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <>
      <style>{`
        .layout-root { min-height: 100vh; min-height: 100dvh; }
        @media (max-width: 640px) {
          .layout-root {
            padding-top: 20px !important;
            padding-bottom: calc(80px + env(safe-area-inset-bottom)) !important;
          }
        }
      `}</style>
      <StarField />
      <CinematicNav />
      <div
        className="layout-root"
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(88px, 11vw, 110px) clamp(20px, 5vw, 56px) 72px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {children}
      </div>
    </>
  )
}
