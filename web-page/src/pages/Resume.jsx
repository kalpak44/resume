import { Link } from 'react-router-dom'

export function Resume({ profile, projects }) {
  if (!profile) return null;
  
  return (
    <>
      {/* Summary Section */}
      <div className="card-flat">
        <h2 className="section-title">
          <i className="fa-solid fa-user text-primary/80 text-[1.1rem]"></i>
          Summary
        </h2>
        <p className="text-foreground leading-[1.7] text-[1.05rem]">
          {profile.summary}
        </p>
      </div>

      {/* Experience Section */}
      <div className="card-flat mt-8">
        <h2 className="section-title">
          <i className="fa-solid fa-briefcase text-primary/80 text-[1.1rem]"></i>
          Experience
        </h2>
        <div className="flex flex-col">
          {profile.experience.map((job, idx) => (
            <div key={idx} className={`${idx > 0 ? 'mt-[47px] pt-[47px] border-t border-line-light dark:border-line-dark' : ''}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <h3 className="text-[1.25rem] font-semibold text-foreground">
                  {job.title}
                </h3>
                <span className="text-primary font-medium text-[1.05rem]">
                  {job.meta.split(',')[0]}
                </span>
              </div>
              <div className="text-foreground/70 dark:text-foreground/60 text-[0.9rem] mt-[2px]">
                {job.meta.split(',').slice(1).join(',').trim()}
              </div>
              {job.description && (
                <p className="mt-3 text-foreground leading-[1.6]">
                  {job.description}
                </p>
              )}
              {job.bullets && (
                <ul className="list-disc list-outside ml-[1.2rem] mt-[10px] space-y-1.5 text-foreground">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="mb-[6px]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-4">
                {[...new Set([
                  ...(job.tags || []),
                  ...(job.technologies || []),
                  ...(job.skills || [])
                ])].map((pill, pIdx) => (
                  <span key={pIdx} className="pill text-[0.75rem] opacity-80">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hobby Projects Section */}
      {projects && projects.length > 0 && (
        <div className="card-flat mt-8">
          <h2 className="section-title">
            <i className="fa-solid fa-code text-primary/80 text-[1.1rem]"></i>
            Hobby Projects
          </h2>
          <div className="grid gap-6">
            {projects.map(project => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block p-4 -m-4 rounded-xl hover:bg-primary/5 transition-all"
              >
                {/* Action Link for project */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all uppercase tracking-wider">View Details</span>
                    <i className="fa-solid fa-arrow-right text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"></i>
                  </div>
                </div>
                <p className="text-foreground/80 mt-2 text-[0.95rem]">{project.summary}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.technologies.slice(0, 6).map((tech, idx) => (
                    <span key={idx} className="pill text-[0.7rem]">{tech}</span>
                  ))}
                  {project.technologies.length > 6 && (
                    <span className="text-foreground/50 text-[0.7rem] self-center">
                      +{project.technologies.length - 6} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      <div className="card-flat mt-8">
        <h2 className="section-title">
          <i className="fa-solid fa-graduation-cap text-primary/80 text-[1.1rem]"></i>
          Education
        </h2>
        <div className="flex flex-col">
          {profile.education.map((edu, idx) => (
            <div key={idx} className={`flex flex-col gap-1 ${idx > 0 ? 'mt-[25px] pt-[25px] border-t border-dashed border-line-light dark:border-line-dark' : ''}`}>
              <div className="font-bold text-lg">{edu.school}</div>
              <div className="text-primary font-medium">{edu.degree}</div>
              {edu.faculty && <div className="text-foreground/70 dark:text-foreground/60 text-sm">{edu.faculty}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
