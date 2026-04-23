import { useEffect } from 'react'
import { StarField } from './StarField.jsx'
import { CinematicNav } from './CinematicNav.jsx'

export function Layout({ children }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <>
      <StarField />
      <CinematicNav />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
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