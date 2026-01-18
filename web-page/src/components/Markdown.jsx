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
    const renderMermaid = async () => {
      if (containerRef.current) {
        // Find all mermaid blocks
        const mermaidBlocks = containerRef.current.querySelectorAll('.language-mermaid')
        
        for (let i = 0; i < mermaidBlocks.length; i++) {
          const block = mermaidBlocks[i]
          const code = block.textContent
          const id = `mermaid-svg-${i}-${Math.random().toString(36).substr(2, 9)}`
          
          try {
            // Check if it's dark theme
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
            mermaid.initialize({
              startOnLoad: false,
              theme: isDark ? 'dark' : 'default',
              securityLevel: 'loose',
              fontFamily: 'inherit',
              themeVariables: {
                fontFamily: 'inherit',
              }
            })

            const { svg } = await mermaid.render(id, code)
            const parent = block.parentElement
            if (parent && parent.tagName === 'PRE') {
              const div = document.createElement('div')
              div.className = 'mermaid-diagram my-8 flex justify-center bg-white/5 p-4 rounded-xl overflow-x-auto'
              div.innerHTML = svg
              parent.parentNode.replaceChild(div, parent)
            }
          } catch (error) {
            console.error('Mermaid rendering error:', error)
          }
        }
      }
    }

    renderMermaid()
  }, [content])

  return (
    <div ref={containerRef} className="markdown-content">
      <ReactMarkdown components={{
        h3: ({node, ...props}) => <h3 className="section-title mt-12" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc list-outside ml-[1.2rem] mt-[10px] space-y-1.5 text-foreground" {...props} />,
        li: ({node, ...props}) => <li className="mb-[6px]" {...props} />,
        p: ({node, ...props}) => <p className="text-[1.05rem] leading-[1.7] text-foreground" {...props} />,
      }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
