import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { Resume } from './pages/Resume'
import { ProjectDetails } from './pages/ProjectDetails'

function App() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    fetch('/data/profile.json')
      .then(res => res.json())
      .then(data => {
        if (data.avatar && data.avatar.startsWith('./data/')) {
            data.avatar = data.avatar.replace('./data/', '/data/');
        }
        setProfile(data)
      })
      .catch(err => console.error('Error loading profile:', err))

    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout theme={theme} toggleTheme={toggleTheme} profile={profile}>
        <Routes>
          <Route path="/" element={<Resume profile={profile} projects={projects} />} />
          <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
