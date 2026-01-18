import { useParams, Link } from 'react-router-dom'

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

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/projects" className="text-primary hover:underline flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Projects
        </Link>
      </div>
      
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

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-foreground/90">
            {project.description}
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4">Key Features & Details</h3>
          <ul className="list-disc list-outside ml-6 space-y-2 text-foreground/85">
            {project.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span key={idx} className="pill">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
