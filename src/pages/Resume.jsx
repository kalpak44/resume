import { Link } from 'react-router-dom'

export function Resume({ profile, projects }) {
  if (!profile) return null

  return (
    <>
      <div className="card-flat">
        <h2 className="section-title">
          <i className="fa-solid fa-user text-primary/80 text-[1.1rem]"></i>
          Summary
        </h2>
        <p className="text-foreground leading-[1.7] text-[1.05rem]">{profile.summary}</p>
      </div>

      <div className="card-flat mt-8">
        <h2 className="section-title">
          <i className="fa-solid fa-briefcase text-primary/80 text-[1.1rem]"></i>
          Experience
        </h2>

        <div className="flex flex-col">
          {profile.experience.map((job, idx) => (
            <div
              key={idx}
              className={`${idx > 0 ? 'border-t border-line-light/60 -mt-px pt-4 mt-4' : ''}`}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                <h3 className="text-[1.25rem] font-semibold text-foreground tracking-tight">
                  {job.title}
                </h3>

                <span className="text-[0.75rem] font-medium text-primary uppercase tracking-wider opacity-85">
                  {job.meta.split(',')[0]}
                </span>
              </div>

              <div className="text-foreground/70 dark:text-foreground/60 text-[0.95rem] mt-1">
                {job.meta.split(',').slice(1).join(',').trim()}
              </div>

              {job.description && (
                <p className="mt-3 text-foreground leading-[1.65] text-[0.98rem]">
                  {job.description}
                </p>
              )}

              {job.bullets && (
                <ul className="list-disc list-outside ml-[1.2rem] mt-[10px] space-y-1.5 text-foreground text-[0.98rem] leading-[1.65]">
                  {job.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="mb-[6px]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-4">
                {[
                  ...new Set([
                    ...(job.tags || []),
                    ...(job.technologies || []),
                    ...(job.skills || []),
                  ]),
                ].map((pill, pIdx) => (
                  <span key={pIdx} className="pill text-[0.75rem] opacity-85">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {projects && projects.length > 0 && (
        <div className="card-flat mt-8">
          <h2 className="section-title">
            <i className="fa-solid fa-code text-primary/80 text-[1.1rem]"></i>
            Hobby Projects
          </h2>

          <div className="flex flex-col">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`${idx > 0 ? 'border-t border-line-light/60 -mt-px pt-4 mt-4' : ''}`}
              >
                <Link
                  to={`/projects/${project.id}`}
                  aria-label={`Open project details for ${project.title}`}
                  className="group block -mx-2 px-2 py-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100 group-active:bg-primary/10 pointer-events-none"
                      aria-hidden="true"
                    />

                    <div className="relative rounded-2xl px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-[1.15rem] font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[0.75rem] font-medium text-primary uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                              View details
                            </span>
                            <i
                              className="fa-solid fa-arrow-right text-primary opacity-80 group-hover:opacity-100 transition-all transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        <p className="text-foreground/75 text-[0.95rem] leading-[1.65] mt-1">
                          {project.summary}
                        </p>

                        <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-3">
                          {(project.technologies || []).slice(0, 6).map((tech, tIdx) => (
                            <span key={tIdx} className="pill text-[0.75rem] opacity-85">
                              {tech}
                            </span>
                          ))}

                          {(project.technologies || []).length > 6 && (
                            <span className="text-foreground/55 text-[0.75rem] self-center">
                              +{project.technologies.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card-flat mt-8">
        <h2 className="section-title">
          <i className="fa-solid fa-graduation-cap text-primary/80 text-[1.1rem]"></i>
          Education
        </h2>

        <div className="flex flex-col">
          {profile.education.map((edu, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-1 ${
                idx > 0
                  ? 'mt-[25px] pt-[25px] border-t border-dashed border-line-light/60 '
                  : ''
              }`}
            >
              <div className="text-[1.15rem] font-semibold text-foreground tracking-tight">
                {edu.school}
              </div>
              <div className="text-primary font-medium text-[1.05rem]">{edu.degree}</div>
              {edu.faculty && (
                <div className="text-foreground/70 dark:text-foreground/60 text-[0.95rem] mt-1">
                  {edu.faculty}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 pb-8">
        <Link
          to="/cheat-sheets"
          className="h-11 inline-flex items-center px-6 rounded-xl font-medium bg-primary text-white hover:bg-primary-hover shadow-[0_10px_22px_rgba(37,99,235,0.18)] transition-all transform hover:-translate-y-px active:translate-y-0"
        >
          <i className="fa-solid fa-book mr-2"></i>
          View Cheat Sheets
        </Link>
      </div>
    </>
  )
}
