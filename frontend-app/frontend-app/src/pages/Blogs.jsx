import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://api.pavel-usanli.online/personal-page-api/v1/blogs?page=0&size=20')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch blogs')
        }
        return res.json()
      })
      .then((data) => {
        setBlogs(data.content || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading blogs:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="card-flat flex items-center justify-center py-12">
        <div className="text-foreground/70">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card-flat flex items-center justify-center py-12 text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center pt-4 pb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors font-medium group cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Resume
        </Link>
      </div>

      <div className="card-flat">
        <h2 className="section-title mb-5">
          <i className="fa-solid fa-blog text-primary/80 text-[1.1rem]"></i>
          Blog
        </h2>

        {blogs.length === 0 ? (
          <p className="text-foreground/70 py-4">No blog posts found.</p>
        ) : (
          <div className="flex flex-col">
            {blogs.map((blog, idx) => (
              <div
                key={blog.id}
                className={`${idx > 0 ? 'border-t border-line-light/60 -mt-px pt-6 mt-6' : ''}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
                    <h3 className="text-[1.25rem] font-semibold text-foreground tracking-tight">
                      {blog.title}
                    </h3>
                    <span className="text-[0.8rem] font-medium text-foreground/50 uppercase tracking-wider">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="mt-2 text-foreground/80 leading-[1.65] text-[1.05rem]">
                    {blog.shortDescription}
                  </p>

                  <div className="mt-4">
                    <span className="text-primary font-medium text-[0.95rem] hover:underline cursor-pointer">
                      Read more{' '}
                      <i className="fa-solid fa-arrow-right ml-1 text-[0.8rem]"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
