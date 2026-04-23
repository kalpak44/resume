import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import mermaid from 'mermaid'
import { useTheme } from '../context/ThemeContext.jsx'

const MERMAID_BASE_CONFIG = {
  startOnLoad: false,
  securityLevel: 'loose',
  fontFamily: 'inherit',
}

mermaid.initialize({
  ...MERMAID_BASE_CONFIG,
  theme: 'default',
})

const CODE_BLOCK_WRAPPER_CLASS =
  'relative group my-6 border border-line-light/60 dark:border-white/10 rounded-xl overflow-hidden bg-slate-50 dark:bg-[#1e1e1e] transition-colors shadow-sm'
const CODE_BLOCK_HEADER_CLASS =
  'flex items-center justify-between px-4 py-2 bg-slate-100 dark:bg-white/5 border-b border-line-light/60 dark:border-white/10 transition-colors'
const CODE_BLOCK_BUTTON_CLASS =
  'text-xs bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 px-2 py-1 rounded transition-colors cursor-pointer'
const CODE_BLOCK_BODY_CLASS =
  '!bg-transparent !p-0 !m-0 !border-0 text-[0.95rem] leading-relaxed text-slate-800 dark:text-slate-200'

function copyToClipboard(text, onSuccess) {
  if (!navigator.clipboard?.writeText) {
    console.error('Clipboard API is not available')
    return
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      onSuccess?.()
    })
    .catch((err) => console.error('Failed to copy!', err))
}

function flashCopiedButton(buttonEl) {
  const originalText = buttonEl.innerText
  buttonEl.innerText = 'Copied!'
  setTimeout(() => {
    buttonEl.innerText = originalText
  }, 2000)
}

function showInlineCopyTip(containerEl) {
  const tip = containerEl.querySelector('.copy-tip')
  if (!tip) return

  tip.classList.remove('opacity-0')
  setTimeout(() => {
    tip.classList.add('opacity-0')
  }, 2000)
}

export function Markdown({ content }) {
  const containerRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!content) return
    let cancelled = false

    const renderMermaid = async () => {
      const root = containerRef.current
      if (!root) return

      const blocks = Array.from(root.querySelectorAll('code.language-mermaid'))
      if (blocks.length === 0) return

      mermaid.initialize({
        ...MERMAID_BASE_CONFIG,
        theme: theme === 'dark' ? 'dark' : 'default',
        themeVariables: { fontFamily: 'inherit' },
      })

      for (let i = 0; i < blocks.length; i++) {
        if (cancelled) return

        const block = blocks[i]
        const pre = block.closest('pre')
        if (!pre) continue
        if (!pre.isConnected) continue
        if (pre.dataset.mermaidRendered === '1') continue

        const code = block.textContent || ''
        if (!code.trim()) continue
        const id = `mermaid-svg-${i}-${Math.random().toString(36).slice(2)}`

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
  }, [content, theme])

  return (
    <div ref={containerRef} className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
          ),
          h3: ({ ...props }) => <h3 className="section-title mt-12" {...props} />,
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-outside ml-[1.2rem] mt-2.5 space-y-1.5 text-foreground"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="mb-1.5" {...props} />,
          p: ({ ...props }) => (
            <p className="text-[1.05rem] leading-[1.7] text-foreground" {...props} />
          ),
          a: ({ ...props }) => (
            <a
              className="text-primary hover:underline underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6">
              <table
                className="min-w-full border-collapse border border-slate-300 dark:border-slate-600"
                {...props}
              />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-slate-100 dark:bg-slate-800" {...props} />
          ),
          tbody: ({ ...props }) => <tbody {...props} />,
          tr: ({ ...props }) => (
            <tr className="border-b border-slate-300 dark:border-slate-600" {...props} />
          ),
          th: ({ ...props }) => (
            <th
              className="px-4 py-2 text-left font-semibold border border-slate-300 dark:border-slate-600"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td
              className="px-4 py-2 border border-slate-300 dark:border-slate-600"
              {...props}
            />
          ),
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')
            const isBlock = !inline && (Boolean(match) || codeString.includes('\n'))

            // In react-markdown v10, code blocks might have inline=false
            // but for some single backtick usage it might be true or undefined.
            // If it has a language-class and is not inline, we treat it as a block.

            if (!inline && match?.[1] === 'mermaid') {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }

            // Fallback for blocks without language (e.g. ``` without lang)
            // Or if inline is false but no language matches, and it's multi-line
            if (isBlock) {
              const language = match?.[1] || 'code'
              const displayClassName = className || ''
              const handleCopy = (e) => {
                const button = e.currentTarget
                copyToClipboard(codeString, () => flashCopiedButton(button))
              }

              return (
                <div className={CODE_BLOCK_WRAPPER_CLASS}>
                  <div className={CODE_BLOCK_HEADER_CLASS}>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">
                      {language}
                    </span>
                    <button onClick={handleCopy} className={CODE_BLOCK_BUTTON_CLASS}>
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto m-0 bg-transparent">
                    <code
                      className={`${displayClassName} ${CODE_BLOCK_BODY_CLASS}`}
                      {...props}
                    >
                      {children}
                    </code>
                  </pre>
                </div>
              )
            }

            // Inline code: check if it starts and ends with ` to be extra safe,
            // but react-markdown usually handles this.
            // We also want to allow copying inline code if it looks like a command.
            const isCommand =
              codeString.startsWith('kubectl') ||
              codeString.startsWith('git') ||
              codeString.includes(' --')

            if (isCommand) {
              const handleCopy = (e) => {
                const container = e.currentTarget
                copyToClipboard(codeString, () => showInlineCopyTip(container))
              }

              return (
                <code
                  onClick={handleCopy}
                  className={`${className || ''} bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[0.9em] font-mono cursor-pointer hover:bg-slate-200 dark:hover:bg-white/20 transition-colors relative group/inline`}
                  title="Click to copy"
                  {...props}
                >
                  {children}
                  <span className="copy-tip absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background dark:bg-foreground dark:text-background text-[10px] px-2 py-1 rounded opacity-0 transition-opacity pointer-events-none whitespace-nowrap">
                    Copied!
                  </span>
                </code>
              )
            }

            return (
              <code
                className={`${className || ''} bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-[0.9em] font-mono`}
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
