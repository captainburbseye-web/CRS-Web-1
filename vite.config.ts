import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import devServer from "@hono/vite-dev-server"
import build from "@hono/vite-build/cloudflare-pages"
import { resolve } from "path"

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    // Client build for React island
    return {
      plugins: [react()],
      build: {
        outDir: 'dist/static',
        emptyOutDir: false,
        manifest: true,
        rollupOptions: {
          input: {
            'rack-entry': resolve(__dirname, 'src/client/rack-entry.tsx')
          }
        }
      }
    }
  }
  
  // Server build (default)
  return {
    plugins: [
      react(),
      build({
        entry: "src/index.tsx",
        output: "./dist",
        emptyOutDir: false
      }),
      devServer({
        entry: "src/index.tsx"
      })
    ]
  }
})
