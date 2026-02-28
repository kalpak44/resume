import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Markdown } from '../components/Markdown.jsx'

export function CheatSheetDetails({ cheatsheets }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const cheatsheet = cheatsheets.find((c) => c.id === id)

  const [isControlsHovered, setIsControlsHovered] = useState(false)
  const [detailsMd, setDetailsMd] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (cheatsheet && cheatsheet.details_file) {
      fetch(`${import.meta.env.BASE_URL}data/${cheatsheet.details_file}`)
        .then((res) => res.text())
        .then((text) => setDetailsMd(text))
        .catch((err) => console.error('Error loading cheatsheet details:', err))
    }
  }, [id, cheatsheet])

  if (!cheatsheet) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Cheat sheet not found</h2>
        <Link to="/" className="text-primary hover:underline">
          Back to resume
        </Link>
      </div>
    )
  }

  const markdownContent = detailsMd

  return (
    <div className="space-y-8">
      <div className="card-flat relative">
        <div
          className="absolute top-4 left-4 z-10 flex gap-2"
          onMouseEnter={() => setIsControlsHovered(true)}
          onMouseLeave={() => setIsControlsHovered(false)}
        >
          <button
            onClick={() => navigate(-1)}
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

        <div className="pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">{cheatsheet.title}</h2>
            </div>
          </div>

          <div>
            <Markdown content={markdownContent} />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back
        </button>
      </div>
    </div>
  )
}
