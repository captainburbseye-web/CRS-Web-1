#!/usr/bin/env node
/**
 * Build script that:
 * 1. Runs client build to generate manifest
 * 2. Copies manifest to src/client-manifest.ts
 * 3. Runs server build with embedded manifest
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

console.log('🔧 Building client bundle...')
execSync('vite build --mode client', { stdio: 'inherit' })

console.log('📋 Reading manifest...')
const manifestPath = resolve('dist/static/.vite/manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))

console.log('📝 Generating client-manifest.ts...')
const manifestCode = `// Auto-generated manifest - DO NOT EDIT
// This file is generated during the build process
export const CLIENT_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const
`

writeFileSync('src/client-manifest.ts', manifestCode)

console.log('🔨 Building server bundle...')
execSync('vite build --mode server', { stdio: 'inherit' })

console.log('✅ Build complete!')
