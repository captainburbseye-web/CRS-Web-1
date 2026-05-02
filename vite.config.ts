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
        // v5.18: enable terser for better dead-code elimination
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,   // strip console.log in prod
            drop_debugger: true,
            passes: 2,            // two-pass for smaller output
          },
          mangle: { toplevel: true },
        },
        rollupOptions: {
          input: {
            'rack-entry': resolve(__dirname, 'src/client/rack-entry.tsx')
          },
          output: {
            // Split React runtime into its own chunk so it caches independently
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
            },
          },
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
