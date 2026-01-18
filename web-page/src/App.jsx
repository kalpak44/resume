import { useState, useEffect } from 'react'
function App() {
  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    fetch('/data/profile.json')
      .then(res => res.json())
      .then(data => {
        // Fix avatar path if needed
        if (data.avatar && data.avatar.startsWith('./data/')) {
            data.avatar = data.avatar.replace('./data/', '/data/');
        }
        setProfile(data)
      })
      .catch(err => console.error('Error loading profile:', err))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  if (!profile) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-12 max-w-[980px]">
      {/* Topbar / Header */}
      <div className="topbar">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-[130px] h-[130px] rounded-[32px] object-cover border-3 border-line-light/70 dark:border-line-dark/70 shadow-[0_12px_28px_rgba(0,0,0,0.12)] bg-white"
            />
          </div>

          {/* Header Main Content */}
          <div className="flex-grow text-center md:text-start">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-5">
              <div className="flex-grow">
                <h1 className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold tracking-tight leading-[1.1] m-0">
                  {profile.name}
                </h1>
                <p className="mt-2 text-primary font-semibold text-[1.15rem] tracking-wide">
                  {profile.role}
                </p>

                {/* Meta Info */}
                <div className="mt-[10px] flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-[10px] text-[0.95rem] text-muted-light dark:text-muted-dark">
                  {profile.meta.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-[10px]">
                      <i className={`${item.icon} text-primary w-[18px] text-center opacity-80 text-base`}></i>
                      {item.link ? (
                        <a href={item.link} className="hover:text-foreground hover:underline underline-offset-[3px] transition-colors text-inherit">
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-xl border border-line-light/85 dark:border-line-dark/85 hover:bg-line-light/20 dark:hover:bg-line-dark/20 transition-all transform hover:-translate-y-px cursor-pointer"
                aria-label="Toggle theme"
              >
                <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-2">
              {profile.buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.href}
                  className={`h-11 inline-flex items-center px-4 rounded-xl font-medium transition-all transform hover:-translate-y-px active:translate-y-0 ${
                    btn.class.includes('btn-primary') 
                      ? 'bg-primary text-white hover:bg-primary-hover shadow-[0_10px_22px_rgba(37,99,235,0.18)]' 
                      : 'border border-line-light dark:border-line-dark hover:bg-line-light/10 dark:hover:bg-line-dark/10'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {btn.icon && <i className={`${btn.icon} mr-[10px]`}></i>}
                  {btn.text}
                </a>
              ))}
              <a
                href="projects.html"
                className="h-11 inline-flex items-center px-4 rounded-xl font-medium border border-primary text-primary hover:bg-primary/5 transition-all transform hover:-translate-y-px active:translate-y-0"
              >
                <i className="fa-solid fa-code mr-[10px]"></i>
                Hobby Projects
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="card-flat mt-8">
        <h2 className="section-title">Summary</h2>
        <p className="text-foreground/90 leading-[1.7] text-[1.05rem]">
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
              <div className="text-muted-light dark:text-muted-dark text-[0.9rem] mt-[2px]">
                {job.meta.split(',').slice(1).join(',').trim()}
              </div>
              {job.description && (
                <p className="mt-3 text-foreground/90 leading-[1.6]">
                  {job.description}
                </p>
              )}
              {job.bullets && (
                <ul className="list-disc list-outside ml-[1.2rem] mt-[10px] space-y-1.5 text-foreground/85">
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
              {edu.faculty && <div className="text-muted-light dark:text-muted-dark text-sm">{edu.faculty}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted-light dark:text-muted-dark mt-12 mb-8 text-[0.9rem]">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  )
}

export default App
