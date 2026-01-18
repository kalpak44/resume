import { useParams, Link } from 'react-router-dom'
import { Markdown } from '../components/Markdown'

export function ProjectDetails({ projects }) {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/projects" className="text-primary hover:underline">Back to projects</Link>
      </div>
    )
  }

  // Combine description and details into a single markdown content
  const markdownContent = `
${project.description}

### Key Features & Details
${project.details_md || project.details.map(d => `* ${d}`).join('\n')}

### Technologies Used
  `.trim()

  return (
    <div className="space-y-8">
      <div className="card-flat">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">{project.title}</h2>
          </div>
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="pill hover:bg-primary hover:text-white transition-colors">
                <i className="fa-brands fa-github mr-2"></i>GitHub
              </a>
            )}
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="pill hover:bg-primary hover:text-white transition-colors">
                <i className="fa-solid fa-external-link mr-2"></i>Live Demo
              </a>
            )}
          </div>
        </div>

        <div>
          <Markdown content={markdownContent} />
          
          <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-3">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="pill">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
