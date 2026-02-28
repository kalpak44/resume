import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Markdown } from '../components/Markdown.jsx'

export function ProjectDetails({ projects }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  const [isControlsHovered, setIsControlsHovered] = useState(false)
  const [markdownContent, setMarkdownContent] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project?.details_file) {
      fetch(`${import.meta.env.BASE_URL}data/${project.details_file}`)
        .then((res) => res.text())
        .then((text) => setMarkdownContent(text))
        .catch((err) => console.error('Error loading project details:', err))
    }
  }, [id, project])

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/" className="text-primary hover:underline">
          Back to resume
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="card-flat relative">
        <div
          className="absolute top-4 left-4 z-10 flex gap-2"
          onMouseEnter={() => setIsControlsHovered(true)}
          onMouseLeave={() => setIsControlsHovered(false)}
        >
          <button
            onClick={() => navigate('/')}
            className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            {isControlsHovered && (
              <svg
                className="w-2 h-2 text-[#8d0e0a]"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center cursor-pointer"
            aria-label="Minimize"
          >
            {isControlsHovered && (
              <svg
                className="w-2 h-2 text-[#8d6302]"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 6h8" strokeLinecap="round" />
              </svg>
            )}
          </button>

          <button
            type="button"
            className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center cursor-pointer"
            aria-label="Maximize"
          >
            {isControlsHovered && (
              <svg
                className="w-2 h-2 text-[#0d5215]"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 6h8M6 2v8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className="pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">{project.title}</h2>
            </div>

            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <i className="fa-brands fa-github mr-2"></i>GitHub
                </a>
              )}
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <i className="fa-solid fa-external-link mr-2"></i>Live Demo
                </a>
              )}
            </div>
          </div>

          <div>
            <Markdown content={markdownContent} />

            {project.technologies && project.technologies.length > 0 && (
              <>
                <h3 className="text-xl font-bold mt-8 mb-4">Technologies Used</h3>

                <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-3">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="pill pill-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Resume
        </button>
      </div>
    </div>
  )
}
