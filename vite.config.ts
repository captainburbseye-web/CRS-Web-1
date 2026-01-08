import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [
    build({
      entry: 'src/index.tsx',
      outputDir: './dist',
      emptyOutDir: false
    }),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'static/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
}))
