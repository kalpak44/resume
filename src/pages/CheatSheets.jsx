import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function CheatSheets({ cheatsheets }) {
  const navigate = useNavigate()
  const [isControlsHovered, setIsControlsHovered] = useState(false)

  if (!cheatsheets) return null

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

        <div className="pt-8">
          <h2 className="section-title">
            <i className="fa-solid fa-book text-primary/80 text-[1.1rem]"></i>
            Cheat Sheets
          </h2>

          <div className="flex flex-col">
            {cheatsheets.map((sheet, idx) => (
              <div
                key={sheet.id}
                className={`${idx > 0 ? 'border-t border-line-light/60 -mt-px pt-4 mt-4' : ''}`}
              >
                <Link
                  to={`/cheat-sheets/${sheet.id}`}
                  aria-label={`Open cheat sheet for ${sheet.title}`}
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
                            {sheet.title}
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
                          {sheet.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Resume
        </Link>
      </div>
    </div>
  )
}
