import { Link, useLocation } from 'react-router-dom'
import { ParticlesNetwork } from './ParticlesNetwork.jsx'

export function Layout({ children, theme, toggleTheme, profile }) {
  const location = useLocation()
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen font-poppins">
        Loading...
      </div>
    )

  const isProject = location.pathname.startsWith('/projects/')
  const isBlog = location.pathname.startsWith('/blog')
  const isHome = location.pathname === '/'
  const isNotFound = !isHome && !isProject && !isBlog

  return (
    <>
      <ParticlesNetwork theme={theme} />
      <div className="container mx-auto px-4 py-12 max-w-[980px]">
        <button
          onClick={toggleTheme}
          className="fixed top-5 right-5 w-11 h-11 flex items-center justify-center rounded-xl border border-line-light/85 dark:border-line-dark/85 hover:bg-line-light/20 dark:hover:bg-line-dark/20 transition-all transform hover:-translate-y-px cursor-pointer z-50 print:hidden"
          aria-label="Toggle theme"
        >
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>

        {!isProject && !isBlog && !isNotFound && (
          <div className="topbar">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-[130px] h-[130px] rounded-[32px] object-cover border-3 border-line-light/70 dark:border-line-dark/70 shadow-[0_12px_28px_rgba(0,0,0,0.12)] bg-white hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <div className="flex-grow text-center md:text-start">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-5">
                  <div className="flex-grow">
                    <h1 className="text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold tracking-tight leading-[1.1] m-0">
                      <Link
                        to="/"
                        className="hover:text-primary transition-colors text-inherit"
                      >
                        {profile.name}
                      </Link>
                    </h1>
                    <p className="mt-2 text-primary font-semibold text-[1.15rem] tracking-wide">
                      {profile.role}
                    </p>

                    <div className="mt-[10px] flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-[10px] text-[0.95rem] text-foreground/70 dark:text-foreground/60">
                      {profile.meta.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-[10px]">
                          <i
                            className={`${item.icon} text-primary w-[18px] text-center opacity-80 text-base`}
                          ></i>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="hover:text-foreground hover:underline underline-offset-[3px] transition-colors text-inherit"
                            >
                              {item.text}
                            </a>
                          ) : (
                            <span>{item.text}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

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

                  <Link
                    to="/cheat-sheets"
                    className="h-11 inline-flex items-center px-4 rounded-xl font-medium border border-line-light dark:border-line-dark hover:bg-line-light/10 dark:hover:bg-line-dark/10 transition-all transform hover:-translate-y-px active:translate-y-0"
                  >
                    <i className="fa-solid fa-book mr-[10px]"></i>
                    Cheat Sheets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <main className={isProject || isBlog || isNotFound ? '' : 'mt-8'}>
          {children}
        </main>

        {!isProject && !isBlog && !isNotFound && (
          <footer className="text-center text-foreground/70 dark:text-foreground/60 mt-12 mb-8 text-[0.9rem]">
            © {new Date().getFullYear()} {profile.name}
          </footer>
        )}
      </div>
    </>
  )
}
