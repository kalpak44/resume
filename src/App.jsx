import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { Resume } from './pages/Resume.jsx'
import { ProjectDetails } from './pages/ProjectDetails.jsx'
import { CheatSheets } from './pages/CheatSheets.jsx'
import { CheatSheetDetails } from './pages/CheatSheetDetails.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx'

const BASE_URL = import.meta.env.BASE_URL
const DATA_BASE_URL = `${BASE_URL}data/`

function App() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [cheatsheets, setCheatsheets] = useState([])

  useEffect(() => {
    fetch(`${DATA_BASE_URL}profile.json`)
      .then((res) => res.json())
      .then((data) => {
        if (data.avatar && data.avatar.startsWith('./data/')) {
          data.avatar = `${BASE_URL}${data.avatar.substring(2)}`
        }
        setProfile(data)
      })
      .catch((err) => console.error('Error loading profile:', err))

    fetch(`${DATA_BASE_URL}projects.json`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error loading projects:', err))

    fetch(`${DATA_BASE_URL}cheatsheets.json`)
      .then((res) => res.json())
      .then((data) => setCheatsheets(data))
      .catch((err) => console.error('Error loading cheatsheets:', err))
  }, [])

  return (
    <ThemeProvider>
      <AppContent profile={profile} projects={projects} cheatsheets={cheatsheets} />
    </ThemeProvider>
  )
}

function AppContent({ profile, projects, cheatsheets }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Router>
      <Layout theme={theme} toggleTheme={toggleTheme} profile={profile}>
        <Routes>
          <Route path="/" element={<Resume profile={profile} projects={projects} />} />
          <Route path="/projects/:id" element={<ProjectDetails projects={projects} />} />
          <Route
            path="/cheat-sheets"
            element={<CheatSheets cheatsheets={cheatsheets} />}
          />
          <Route
            path="/cheat-sheets/:id"
            element={<CheatSheetDetails cheatsheets={cheatsheets} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
