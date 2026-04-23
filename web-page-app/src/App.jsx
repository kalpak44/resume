import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { Layout } from './components/Layout.jsx'
import { CinematicResume } from './pages/CinematicResume.jsx'
import { Projects } from './pages/Projects.jsx'
import { ProjectDetails } from './pages/ProjectDetails.jsx'
import { CheatSheets } from './pages/CheatSheets.jsx'
import { CheatSheetDetails } from './pages/CheatSheetDetails.jsx'
import { NotFound } from './pages/NotFound.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CinematicResume />} />

        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Layout>
              <ProjectDetails />
            </Layout>
          }
        />
        <Route
          path="/cheat-sheets"
          element={
            <Layout>
              <CheatSheets />
            </Layout>
          }
        />
        <Route
          path="/cheat-sheets/:id"
          element={
            <Layout>
              <CheatSheetDetails />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
