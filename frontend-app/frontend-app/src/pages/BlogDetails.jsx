import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Markdown } from '../components/Markdown.jsx'

export function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    setLoading(true)
    fetch(`https://api.pavel-usanli.online/personal-page-api/v1/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch blog details')
        }
        return res.json()
      })
      .then((data) => {
        setBlog(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading blog details:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="card-flat flex items-center justify-center py-12">
        <div className="text-foreground/70">Loading blog details...</div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">{error || 'Blog post not found'}</h2>
        <Link to="/blogs" className="text-primary hover:underline">
          Back to blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="card-flat">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-4">
            <h2 className="text-3xl font-bold">{blog.title}</h2>
            <span className="text-[0.8rem] font-medium text-foreground/50 uppercase tracking-wider">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div>
          <Markdown content={blog.longDescriptionMd} />
        </div>
      </div>

      <div className="flex justify-center pt-4 pb-8">
        <button
          onClick={() => navigate('/blogs')}
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Blogs
        </button>
      </div>
    </div>
  )
}
