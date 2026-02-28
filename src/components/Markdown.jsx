import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'inherit',
})

export function Markdown({ content }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!content) return
    let cancelled = false

    const renderMermaid = async () => {
      const root = containerRef.current
      if (!root) return

      const blocks = Array.from(root.querySelectorAll('code.language-mermaid'))
      if (blocks.length === 0) return

      for (let i = 0; i < blocks.length; i++) {
        if (cancelled) return

        const block = blocks[i]
        const pre = block.closest('pre')
        if (!pre) continue
        if (!pre.isConnected) continue
        if (pre.dataset.mermaidRendered === '1') continue

        const code = block.textContent || ''
        const id = `mermaid-svg-${i}-${Math.random().toString(36).slice(2)}`
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'loose',
          fontFamily: 'inherit',
          themeVariables: { fontFamily: 'inherit' },
        })

        try {
          const { svg } = await mermaid.render(id, code)
          if (cancelled) return
          if (!pre.isConnected) continue

          const div = document.createElement('div')
          div.className =
            'mermaid-diagram my-8 flex justify-center bg-white/5 p-4 rounded-xl overflow-x-auto'
          div.innerHTML = svg

          pre.dataset.mermaidRendered = '1'
          pre.replaceWith(div)
        } catch (error) {
          console.error('Mermaid rendering error:', error)
        }
      }
    }

    renderMermaid()

    return () => {
      cancelled = true
    }
  }, [content])

  return (
    <div ref={containerRef} className="markdown-content">
      <ReactMarkdown
        components={{
          h3: ({ ...props }) => <h3 className="section-title mt-12" {...props} />,
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-outside ml-[1.2rem] mt-[10px] space-y-1.5 text-foreground"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="mb-[6px]" {...props} />,
          p: ({ ...props }) => (
            <p className="text-[1.05rem] leading-[1.7] text-foreground" {...props} />
          ),
          code: ({ className, children, ...props }) => (
            <code className={className} {...props}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
