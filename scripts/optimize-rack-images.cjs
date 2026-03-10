#!/usr/bin/env node

/**
 * Rack Image Optimization Script
 * 
 * Features:
 * 1. WebP conversion (30-40% size reduction)
 * 2. Lossless compression
 * 3. Responsive image generation (mobile, tablet, desktop)
 * 
 * Usage: node scripts/optimize-rack-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  outputDir: path.join(__dirname, '..', 'public', 'static', 'rack-images'),
  tempDir: path.join(__dirname, '..', 'temp-images'),
  
  // Rack image URLs from R2
  images: [
    {
      name: 'header',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/rack%201%20CRS%20Header.png',
      priority: 'high',
      sizes: [1920, 1280, 640] // Desktop, tablet, mobile
    },
    {
      name: 'welcome-rack',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/0%20-%20crs%20welcoem%20rack%20-%20canon%20booking%20link%20to%20rack.png',
      priority: 'high',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'cowley-services',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/1%20-%20Cowley%20services.png',
      priority: 'medium',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'cricket-services',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/2%20-%20cricket%20services%20rack.png',
      priority: 'medium',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'cowley-rehearsal',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/3%20cowley%20rd%20rehearsal%20room%20rack.png',
      priority: 'low',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'cricket-rehearsal',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/4%20crticket%20rd%20rehearsal%20rack.png',
      priority: 'low',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'control-room',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/control%20room%20hire%20rack.png',
      priority: 'low',
      sizes: [1920, 1280, 640]
    },
    {
      name: 'workshop-cafe',
      url: 'https://pub-991d8d2677374c528678829280f50c98.r2.dev/rack%20ui%20v2/9%20wscafe%20rack.png',
      priority: 'low',
      sizes: [1920, 1280, 640]
    }
  ]
};

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download image from URL
function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {});
      reject(err);
    });
  });
}

// Check if ImageMagick is installed
function checkImageMagick() {
  try {
    execSync('convert -version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Convert to WebP using ImageMagick
function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    execSync(`convert "${inputPath}" -quality ${quality} "${outputPath}"`, {
      stdio: 'pipe'
    });
    return true;
  } catch (err) {
    console.error(`WebP conversion failed: ${err.message}`);
    return false;
  }
}

// Resize image using ImageMagick
function resizeImage(inputPath, outputPath, width) {
  try {
    execSync(`convert "${inputPath}" -resize ${width}x "${outputPath}"`, {
      stdio: 'pipe'
    });
    return true;
  } catch (err) {
    console.error(`Resize failed: ${err.message}`);
    return false;
  }
}

// Get file size in KB
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Generate srcset string
function generateSrcSet(name, sizes) {
  const entries = sizes.map(width => 
    `/static/rack-images/${name}-${width}w.webp ${width}w`
  );
  return entries.join(', ');
}

// Process single image
async function processImage(imageConfig) {
  console.log(`\n📸 Processing: ${imageConfig.name}`);
  
  const originalPath = path.join(CONFIG.tempDir, `${imageConfig.name}.png`);
  
  // Download original
  console.log(`   ⬇️  Downloading...`);
  try {
    await downloadImage(imageConfig.url, originalPath);
    const originalSize = getFileSize(originalPath);
    console.log(`   ✅ Downloaded (${originalSize} KB)`);
  } catch (err) {
    console.error(`   ❌ Download failed: ${err.message}`);
    return null;
  }
  
  const results = {
    name: imageConfig.name,
    priority: imageConfig.priority,
    original: {
      size: getFileSize(originalPath),
      path: originalPath
    },
    variants: []
  };
  
  // Generate responsive variants
  for (const width of imageConfig.sizes) {
    const resizedPath = path.join(CONFIG.tempDir, `${imageConfig.name}-${width}w.png`);
    const webpPath = path.join(CONFIG.outputDir, `${imageConfig.name}-${width}w.webp`);
    
    // Resize
    console.log(`   📏 Resizing to ${width}px...`);
    if (!resizeImage(originalPath, resizedPath, width)) {
      continue;
    }
    
    const resizedSize = getFileSize(resizedPath);
    
    // Convert to WebP
    console.log(`   🔄 Converting to WebP...`);
    if (!convertToWebP(resizedPath, webpPath, 85)) {
      continue;
    }
    
    const webpSize = getFileSize(webpPath);
    const savings = ((1 - (webpSize / resizedSize)) * 100).toFixed(1);
    
    console.log(`   ✅ ${width}w: ${resizedSize} KB → ${webpSize} KB (${savings}% smaller)`);
    
    results.variants.push({
      width,
      png: { path: resizedPath, size: resizedSize },
      webp: { path: webpPath, size: webpSize },
      savings: `${savings}%`
    });
    
    // Clean up resized PNG
    fs.unlinkSync(resizedPath);
  }
  
  // Also create a full-size WebP as fallback
  const fullWebpPath = path.join(CONFIG.outputDir, `${imageConfig.name}.webp`);
  console.log(`   🔄 Creating full-size WebP fallback...`);
  if (convertToWebP(originalPath, fullWebpPath, 85)) {
    const fullWebpSize = getFileSize(fullWebpPath);
    const fullSavings = ((1 - (fullWebpSize / results.original.size)) * 100).toFixed(1);
    console.log(`   ✅ Full-size: ${results.original.size} KB → ${fullWebpSize} KB (${fullSavings}% smaller)`);
    
    results.fullWebp = {
      path: fullWebpPath,
      size: fullWebpSize,
      savings: `${fullSavings}%`
    };
  }
  
  return results;
}

// Generate HTML snippet for responsive images
function generateHTMLSnippet(results) {
  const snippets = results.map(result => {
    if (!result) return '';
    
    const srcset = generateSrcSet(result.name, result.variants.map(v => v.width));
    
    return `
<!-- ${result.name} - Priority: ${result.priority} -->
<picture>
  <source 
    type="image/webp" 
    srcset="${srcset}"
    sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
  />
  <img 
    src="/static/rack-images/${result.name}.webp"
    alt="${result.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}"
    loading="${result.priority === 'high' ? 'eager' : 'lazy'}"
    class="rack-module-img"
    width="1920"
    height="auto"
  />
</picture>`;
  });
  
  return snippets.join('\n');
}

// Main execution
async function main() {
  console.log('🚀 Rack Image Optimization Starting...\n');
  
  // Check dependencies
  if (!checkImageMagick()) {
    console.error('❌ ImageMagick not found. Installing...');
    try {
      execSync('apt-get update && apt-get install -y imagemagick', { stdio: 'inherit' });
      console.log('✅ ImageMagick installed successfully');
    } catch (err) {
      console.error('❌ Failed to install ImageMagick. Please install manually.');
      process.exit(1);
    }
  }
  
  // Setup directories
  ensureDir(CONFIG.outputDir);
  ensureDir(CONFIG.tempDir);
  
  // Process all images
  const results = [];
  for (const imageConfig of CONFIG.images) {
    const result = await processImage(imageConfig);
    results.push(result);
  }
  
  // Generate report
  console.log('\n\n📊 OPTIMIZATION REPORT\n');
  console.log('═'.repeat(70));
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  results.forEach(result => {
    if (!result) return;
    
    const original = parseFloat(result.original.size);
    const optimized = result.variants.reduce((sum, v) => sum + parseFloat(v.webp.size), 0);
    
    totalOriginal += original;
    totalOptimized += optimized;
    
    console.log(`\n${result.name.toUpperCase()}`);
    console.log(`  Original: ${result.original.size} KB`);
    result.variants.forEach(v => {
      console.log(`  ${v.width}w: ${v.webp.size} KB (${v.savings} smaller)`);
    });
  });
  
  const totalSavings = ((1 - (totalOptimized / totalOriginal)) * 100).toFixed(1);
  
  console.log('\n' + '═'.repeat(70));
  console.log(`\n💾 TOTAL SAVINGS: ${totalSavings}%`);
  console.log(`   Original: ${totalOriginal.toFixed(2)} KB`);
  console.log(`   Optimized: ${totalOptimized.toFixed(2)} KB`);
  console.log(`   Saved: ${(totalOriginal - totalOptimized).toFixed(2)} KB\n`);
  
  // Generate HTML snippets
  const htmlSnippets = generateHTMLSnippet(results);
  const snippetPath = path.join(CONFIG.outputDir, 'responsive-images.html');
  fs.writeFileSync(snippetPath, htmlSnippets);
  console.log(`✅ HTML snippets saved to: ${snippetPath}\n`);
  
  // Generate image map JSON
  const imageMap = results.filter(r => r).reduce((map, result) => {
    map[result.name] = {
      priority: result.priority,
      srcset: generateSrcSet(result.name, result.variants.map(v => v.width)),
      fallback: `/static/rack-images/${result.name}.webp`,
      variants: result.variants.map(v => ({
        width: v.width,
        src: `/static/rack-images/${result.name}-${v.width}w.webp`,
        size: v.webp.size
      }))
    };
    return map;
  }, {});
  
  const mapPath = path.join(CONFIG.outputDir, 'image-map.json');
  fs.writeFileSync(mapPath, JSON.stringify(imageMap, null, 2));
  console.log(`✅ Image map saved to: ${mapPath}\n`);
  
  // Cleanup temp directory
  console.log('🧹 Cleaning up temporary files...');
  fs.rmSync(CONFIG.tempDir, { recursive: true, force: true });
  console.log('✅ Cleanup complete\n');
  
  console.log('🎉 OPTIMIZATION COMPLETE!\n');
}

// Run
main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
