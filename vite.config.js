import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function runXlsxUpdate() {
  try {
    execSync('node scripts/read-xlsx.js', { cwd: __dirname, stdio: 'inherit' })
  } catch (e) {
    console.error('[xlsx]', e.message)
  }
}

/** При изменении .xlsx в public/products перезаписывает xlsxData.json и триггерит HMR */
function xlsxWatchPlugin() {
  return {
    name: 'xlsx-watch',
    configureServer(server) {
      runXlsxUpdate()
      server.watcher.add(path.join(__dirname, 'public/products/**/*.xlsx'))
      server.watcher.on('change', (file) => {
        if (file.endsWith('.xlsx')) {
          runXlsxUpdate()
          const jsonPath = path.join(__dirname, 'src/shared/data/xlsxData.json')
          server.ws.send({ type: 'full-reload', path: jsonPath })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [xlsxWatchPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
