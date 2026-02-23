import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function NotFound() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
      <div className="card-flat max-w-md w-full p-12 flex flex-col items-center gap-6">
        <div className="relative">
          <div className="text-[8rem] font-bold text-primary/10 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fa-solid fa-ghost text-5xl text-primary animate-bounce"></i>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-foreground/60 leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-foreground/40 text-sm mt-4">
            Redirecting to home in <span className="text-primary font-semibold">{countdown}</span> seconds...
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
