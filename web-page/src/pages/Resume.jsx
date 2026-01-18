export function Resume({ profile }) {
  if (!profile) return null;
  
  return (
    <>
      {/* Summary Section */}
      <div className="card-flat">
        <h2 className="section-title">Summary</h2>
        <p className="text-foreground leading-[1.7] text-[1.05rem]">
          {profile.summary}
        </p>
      </div>

      {/* Experience Section */}
      <div className="card-flat mt-8">
        <h2 className="section-title">Experience</h2>
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
              <div className="flex flex-wrap gap-x-[6px] gap-y-1 mt-3">
                {[...new Set([
                  ...(job.tags || []),
                  ...(job.technologies || []),
                  ...(job.skills || [])
                ])].map((pill, pIdx) => (
                  <span key={pIdx} className="pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="card-flat mt-8">
        <h2 className="section-title">Education</h2>
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
