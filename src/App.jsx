import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Resume } from './pages/Resume.jsx'
import { ProjectDetails } from './pages/ProjectDetails.jsx'
import { BlogDetails } from './pages/BlogDetails.jsx'
import { Blogs } from './pages/Blogs.jsx'
import { NotFound } from './pages/NotFound.jsx'

function App() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/profile.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.avatar && data.avatar.startsWith('./data/')) {
          data.avatar = `${import.meta.env.BASE_URL}${data.avatar.substring(2)}`
        }
        setProfile(data)
      })
      .catch((err) => console.error('Error loading profile:', err))

    fetch(`${import.meta.env.BASE_URL}data/projects.json`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error loading projects:', err))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Router>
      <Layout theme={theme} toggleTheme={toggleTheme} profile={profile}>
        <Routes>
          <Route path="/" element={<Resume profile={profile} projects={projects} />} />
          <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
          <Route path="*" element={<NotFound />} />
          {/*<Route path="/blogs" element={<Blogs />} />*/}
          {/*<Route path="/blogs/:id" element={<BlogDetails />} />*/}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
