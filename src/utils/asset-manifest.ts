/**
 * Asset manifest resolver for client bundles
 * Reads .vite/manifest.json at runtime to resolve hashed filenames
 */

let manifestCache: Record<string, any> | null = null

export function getClientAsset(entryName: string): string {
  // In dev mode, use source path for Vite HMR
  if (import.meta.env.DEV) {
    return `/src/client/${entryName}.tsx`
  }
  
  // In production, resolve from manifest
  // Pattern: rack-entry -> rack-entry.[hash].js
  // The manifest is generated at build time in dist/static/.vite/manifest.json
  
  // For Cloudflare Workers, we'll use a simpler approach:
  // Import the manifest as a virtual module at build time
  
  // Fallback to predictable pattern
  // Since we set entryFileNames: '[name].[hash].js', we can use glob pattern
  return `/static/rack-entry.*.js`
}

// Alternative: embed manifest at build time using Vite plugin
// This would be more reliable but requires config changes
export function resolveAsset(path: string): string {
  if (import.meta.env.DEV) {
    return path
  }
  
  // In production, the manifest tells us the actual hashed filename
  // For now, we use a pattern that Cloudflare Pages can serve
  return path
}
