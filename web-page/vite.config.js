import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Custom plugin to serve/copy data from root data directory
const dataPlugin = () => ({
  name: 'data-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url.startsWith('/data/')) {
        const filePath = path.join(__dirname, '..', req.url)
        if (fs.existsSync(filePath)) {
          res.setHeader('Content-Type', getContentType(filePath))
          res.end(fs.readFileSync(filePath))
          return
        }
      }
      next()
    })
  },
  closeBundle() {
    const srcDir = path.join(__dirname, '..', 'data')
    const destDir = path.join(__dirname, 'dist', 'data')
    if (fs.existsSync(srcDir)) {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true })
      }
      fs.readdirSync(srcDir).forEach((file) => {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file))
      })
    }
  },
})

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.json':
      return 'application/json'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.png':
      return 'image/png'
    default:
      return 'application/octet-stream'
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), dataPlugin()],
})
