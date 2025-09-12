#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { gzipSizeSync } = require('gzip-size');
const { sync: brotliSizeSync } = require('brotli-size');
const prettyBytes = require('pretty-bytes').default;

const ROOT = process.env.PROJECT_DIR || '.';
const STORYBOOK_STATIC_DIR = 'storybook-static';
const OUT_DIR = '.bundle-analysis';

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

console.log(`ROOT: ${ROOT}`);
console.log(`STORYBOOK_STATIC_DIR: ${STORYBOOK_STATIC_DIR}`);
console.log(`OUT_DIR: ${OUT_DIR}`);
console.log(`Current working directory: ${process.cwd()}`);

// Check if storybook-static directory exists
if (!fs.existsSync(STORYBOOK_STATIC_DIR)) {
  console.log(`❌ storybook-static directory not found at: ${STORYBOOK_STATIC_DIR}`);
  console.log('This suggests the Storybook build may have failed or completed in a different location');
  process.exit(1);
}

/**
 * Get file size information including gzip and brotli compression
 * @param {string} filePath - Path to the file
 * @returns {Object|null} Size information or null if file doesn't exist
 */
const getFileSizeInfo = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  
  try {
    const buf = fs.readFileSync(filePath);
    const raw = buf.length;
    const gz = gzipSizeSync(buf);
    const br = brotliSizeSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } });
    return { raw, gz, br };
  } catch (error) {
    console.log(`Error reading file ${filePath}: ${error.message}`);
    return null;
  }
};

/**
 * Recursively find all files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to include
 * @returns {string[]} Array of file paths
 */
const findFiles = (dir, extensions = ['.js', '.css']) => {
  const files = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const walk = (d) => {
    try {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      for (const ent of entries) {
        const fullPath = path.join(d, ent.name);
        if (ent.isDirectory()) {
          walk(fullPath);
        } else if (ent.isFile()) {
          const ext = path.extname(ent.name);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.log(`Error reading directory ${d}: ${error.message}`);
    }
  };
  
  walk(dir);
  return files;
};

/**
 * Analyze Storybook bundle structure
 */
const analyzeStorybookBundles = () => {
  const assetsDir = path.join(STORYBOOK_STATIC_DIR, 'assets');
  const files = findFiles(assetsDir);
  
  console.log(`\n=== Found ${files.length} asset files ===`);
  
  const bundleInfo = {
    totalFiles: files.length,
    totalSize: { raw: 0, gz: 0, br: 0 },
    files: [],
    categories: {
      js: [],
      css: [],
      other: []
    }
  };
  
  for (const file of files) {
    const sizeInfo = getFileSizeInfo(file);
    if (!sizeInfo) continue;
    
    const relativePath = path.relative(STORYBOOK_STATIC_DIR, file);
    const ext = path.extname(file);
    const fileName = path.basename(file);
    
    const fileInfo = {
      path: relativePath,
      name: fileName,
      size: sizeInfo.raw,
      gzip: sizeInfo.gz,
      brotli: sizeInfo.br,
      extension: ext
    };
    
    bundleInfo.files.push(fileInfo);
    bundleInfo.totalSize.raw += sizeInfo.raw;
    bundleInfo.totalSize.gz += sizeInfo.gz;
    bundleInfo.totalSize.br += sizeInfo.br;
    
    // Categorize files
    if (ext === '.js') {
      bundleInfo.categories.js.push(fileInfo);
    } else if (ext === '.css') {
      bundleInfo.categories.css.push(fileInfo);
    } else {
      bundleInfo.categories.other.push(fileInfo);
    }
  }
  
  // Sort files by brotli size (descending)
  bundleInfo.files.sort((a, b) => b.brotli - a.brotli);
  bundleInfo.categories.js.sort((a, b) => b.brotli - a.brotli);
  bundleInfo.categories.css.sort((a, b) => b.brotli - a.brotli);
  
  return bundleInfo;
};

/**
 * Generate markdown report
 */
const generateReport = (bundleInfo) => {
  const now = new Date().toISOString().replace('T', ' ').replace('Z', ' UTC');
  const fmt = (b) => (typeof b === 'number' ? prettyBytes(b) : 'n/a');
  
  let md = `## 📦 Storybook Bundle Analysis (Vite)

*Generated ${now}*

### 📊 Summary
- **Total Files**: ${bundleInfo.totalFiles}
- **Total Size**: ${fmt(bundleInfo.totalSize.raw)} (raw) | ${fmt(bundleInfo.totalSize.gz)} (gzip) | ${fmt(bundleInfo.totalSize.br)} (brotli)
- **JavaScript Files**: ${bundleInfo.categories.js.length}
- **CSS Files**: ${bundleInfo.categories.css.length}

<details>
<summary><strong>🧱 Largest JavaScript Bundles</strong></summary>

| File | Raw | Gzip | Brotli |
|---|---:|---:|---:|
`;

  // Top 10 JS files
  for (const file of bundleInfo.categories.js.slice(0, 10)) {
    const status = file.brotli <= 100 * 1024 ? '🟢' : file.brotli <= 250 * 1024 ? '🟡' : '🔴';
    md += `| \`${file.name}\` | ${fmt(file.size)} | ${fmt(file.gzip)} | ${fmt(file.brotli)} ${status} |\n`;
  }
  
  md += `\n</details>\n\n`;

  if (bundleInfo.categories.css.length > 0) {
    md += `<details>
<summary><strong>🎨 CSS Files</strong></summary>

| File | Raw | Gzip | Brotli |
|---|---:|---:|---:|
`;

    for (const file of bundleInfo.categories.css) {
      md += `| \`${file.name}\` | ${fmt(file.size)} | ${fmt(file.gzip)} | ${fmt(file.brotli)} |\n`;
    }
    
    md += `\n</details>\n\n`;
  }

  md += `<details>
<summary><strong>📁 All Files</strong></summary>

| File | Type | Raw | Gzip | Brotli |
|---|---:|---:|---:|---:|
`;

  for (const file of bundleInfo.files.slice(0, 20)) { // Top 20 files
    const status = file.brotli <= 100 * 1024 ? '🟢' : file.brotli <= 250 * 1024 ? '🟡' : '🔴';
    md += `| \`${file.name}\` | ${file.extension} | ${fmt(file.size)} | ${fmt(file.gzip)} | ${fmt(file.brotli)} ${status} |\n`;
  }
  
  md += `\n</details>\n\n`;

  md += `<details>
<summary><strong>📑 Analysis Files</strong></summary>

- Bundle analysis HTML: \`storybook-static/storybook-bundle-analysis.html\` (if generated with ANALYZE_STORYBOOK=true)
- Chromatic stats: \`storybook-static/preview-stats.json\` (for TurboSnap dependency tracking)
- Static files: \`storybook-static/assets/\`
- Storybook build: \`storybook-static/\`

**Note**: This analysis is based on Vite's build output. For detailed dependency analysis, use the bundle analysis HTML file generated with \`pnpm run build-storybook:analyze\`. The preview-stats.json file is used by Chromatic TurboSnap to determine which stories to test.
</details>
`;

  return md;
};

// Main execution
try {
  console.log('\n=== Starting Storybook Bundle Analysis ===');
  
  const bundleInfo = analyzeStorybookBundles();
  
  if (bundleInfo.files.length === 0) {
    console.log('❌ No files found in storybook-static directory');
    process.exit(1);
  }
  
  console.log(`✅ Analyzed ${bundleInfo.files.length} files`);
  console.log(`📊 Total bundle size: ${prettyBytes(bundleInfo.totalSize.br)} (brotli)`);
  
  const report = generateReport(bundleInfo);
  
  // Write the report
  const reportPath = path.join(OUT_DIR, 'comment.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`✅ Bundle analysis report written to: ${reportPath}`);
  
  // Verify the file was created
  if (fs.existsSync(reportPath)) {
    const stats = fs.statSync(reportPath);
    console.log(`📁 Report file size: ${stats.size} bytes`);
  }
  
} catch (error) {
  console.error(`❌ Error during bundle analysis: ${error.message}`);
  
  // Create error report
  const errorReport = `## 📦 Storybook Bundle Analysis (Vite)

❌ **Error** - Failed to generate bundle analysis: ${error.message}

Please check the workflow logs for details.

*Generated: ${new Date().toISOString().replace('T', ' ').replace('Z', ' UTC')}*`;
  
  try {
    fs.writeFileSync(path.join(OUT_DIR, 'comment.md'), errorReport);
    console.log('✅ Created error fallback report');
  } catch (fallbackError) {
    console.error(`❌ Failed to create fallback report: ${fallbackError.message}`);
    process.exit(1);
  }
}
