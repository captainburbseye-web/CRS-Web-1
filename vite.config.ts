import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import devServer from "@hono/vite-dev-server"
import build from "@hono/vite-build/cloudflare-pages"

export default defineConfig({
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
})
