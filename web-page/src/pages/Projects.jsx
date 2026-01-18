import { Link } from 'react-router-dom'

export function Projects({ projects }) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Hobby Projects</h2>
      <div className="grid gap-6">
        {projects.map(project => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="card-flat hover:border-primary/50 transition-colors block group"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-foreground mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="pill text-xs">{tech}</span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-foreground/70 dark:text-foreground/60 text-xs self-center">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
