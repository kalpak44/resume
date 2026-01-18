import { Link } from 'react-router-dom'

export function Projects({ projects }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-2">
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Resume
        </Link>
      </div>
      <h2 className="text-3xl font-bold">Hobby Projects</h2>
      <div className="grid gap-6">
        {projects.map(project => (
          <div key={project.id} className="card-flat hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-bold mb-2">
              <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                {project.title}
              </Link>
            </h3>
            <p className="text-foreground/80 mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="pill text-xs">{tech}</span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-muted-light dark:text-muted-dark text-xs self-center">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
            <Link 
              to={`/projects/${project.id}`}
              className="text-primary font-medium hover:underline inline-flex items-center gap-2"
            >
              View Details
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
