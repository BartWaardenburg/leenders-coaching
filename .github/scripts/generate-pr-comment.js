#!/usr/bin/env node

/**
 * Generate PR metrics comparison comment
 * Extracts the inline JavaScript from the workflow for better maintainability
 */

const fs = require('fs');
const path = require('path');

/**
 * Load JSON file with error handling and validation
 * @param {string} filePath - Path to JSON file
 * @param {object} fallback - Fallback object if file doesn't exist or is invalid
 * @returns {object} Parsed JSON or fallback
 */
const loadJson = (filePath, fallback = {}) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      return fallback;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(content);
    
    console.log(`✅ Loaded: ${filePath}`);
    return parsed;
  } catch (error) {
    console.warn(`⚠️ Error loading ${filePath}:`, error.message);
    return fallback;
  }
};

/**
 * Format numeric changes with arrows and percentages
 * @param {number} current - Current value
 * @param {number} baseline - Baseline value
 * @param {string} unit - Unit suffix (%, KB, etc.)
 * @param {boolean} reverse - If true, increase shows 📈, decrease shows 📉
 * @returns {string} Formatted change string
 */
const formatChange = (current, baseline, unit = '%', reverse = false) => {
  if (baseline === 0 && current === 0) return 'No change';
  if (baseline === 0) return `${current}${unit} (new)`;
  
  const change = current - baseline;
  const changePercent = baseline > 0 ? ((change / baseline) * 100).toFixed(1) : '0.0';
  const arrow = change > 0 ? (reverse ? '📈' : '📉') : (reverse ? '📉' : '📈');
  const sign = change > 0 ? '+' : '';
  
  if (Math.abs(change) < 0.01) return 'No change';
  return `${sign}${change.toFixed(1)}${unit} (${sign}${changePercent}%) ${arrow}`;
};

/**
 * Format Lighthouse scores with color-coded emojis
 * @param {number} score - Score between 0 and 1
 * @returns {string} Formatted score with emoji
 */
const formatScore = (score) => {
  if (typeof score !== 'number' || score < 0) return 'N/A';
  
  const percentage = Math.round(score * 100);
  const emoji = percentage >= 90 ? '🟢' : percentage >= 70 ? '🟡' : '🔴';
  return `${emoji} ${percentage}%`;
};

/**
 * Format file sizes in appropriate units
 * @param {number} sizeKb - Size in kilobytes
 * @returns {string} Formatted size
 */
const formatSize = (sizeKb) => {
  if (typeof sizeKb !== 'number' || sizeKb < 0) return '0 KB';
  if (sizeKb > 1024) return `${(sizeKb / 1024).toFixed(1)} MB`;
  return `${sizeKb} KB`;
};

/**
 * Format time values in appropriate units
 * @param {number} timeMs - Time in milliseconds
 * @returns {string} Formatted time
 */
const formatTime = (timeMs) => {
  if (typeof timeMs !== 'number' || timeMs < 0) return '0ms';
  if (timeMs >= 1000) return `${(timeMs / 1000).toFixed(2)}s`;
  return `${timeMs.toFixed(0)}ms`;
};

/**
 * Generate comprehensive PR metrics comment
 * @param {object} metrics - Object containing all metric data
 * @returns {string} Markdown comment content
 */
const generateComment = (metrics) => {
  const {
    prCoverage,
    baselineCoverage,
    prBundle,
    baselineBundle,
    prLighthouse,
    prEslint,
    prTypescript
  } = metrics;

  let comment = `## 📊 PR Metrics Report\n\n`;
  
  // Coverage section
  comment += `### 🧪 Code Coverage\n`;
  comment += `| Metric | Current | Change |\n`;
  comment += `|--------|---------|--------|\n`;
  comment += `| Statements | ${(prCoverage.statements || 0).toFixed(1)}% | ${formatChange(prCoverage.statements || 0, baselineCoverage.statements || 0)} |\n`;
  comment += `| Branches | ${(prCoverage.branches || 0).toFixed(1)}% | ${formatChange(prCoverage.branches || 0, baselineCoverage.branches || 0)} |\n`;
  comment += `| Functions | ${(prCoverage.functions || 0).toFixed(1)}% | ${formatChange(prCoverage.functions || 0, baselineCoverage.functions || 0)} |\n`;
  comment += `| Lines | ${(prCoverage.lines || 0).toFixed(1)}% | ${formatChange(prCoverage.lines || 0, baselineCoverage.lines || 0)} |\n\n`;
  
  // Bundle size section
  comment += `### 📦 Bundle Size\n`;
  comment += `| Asset | Current | Change |\n`;
  comment += `|--------|---------|--------|\n`;
  comment += `| JavaScript | ${formatSize(prBundle.js_size_kb)} | ${formatChange(prBundle.js_size_kb || 0, baselineBundle.js_size_kb || 0, ' KB', true)} |\n`;
  comment += `| CSS | ${formatSize(prBundle.css_size_kb)} | ${formatChange(prBundle.css_size_kb || 0, baselineBundle.css_size_kb || 0, ' KB', true)} |\n`;
  comment += `| Total | ${formatSize(prBundle.total_size_kb)} | ${formatChange(prBundle.total_size_kb || 0, baselineBundle.total_size_kb || 0, ' KB', true)} |\n`;
  comment += `| Chunks | ${prBundle.total_chunks || 0} | ${formatChange(prBundle.total_chunks || 0, baselineBundle.total_chunks || 0, '', true)} |\n\n`;
  
  // Lighthouse section (if available)
  if (prLighthouse && typeof prLighthouse.performance !== 'undefined') {
    comment += `### 🚀 Lighthouse Scores\n`;
    comment += `| Category | Score |\n`;
    comment += `|----------|-------|\n`;
    comment += `| Performance | ${formatScore(prLighthouse.performance)} |\n`;
    comment += `| Accessibility | ${formatScore(prLighthouse.accessibility)} |\n`;
    comment += `| Best Practices | ${formatScore(prLighthouse['best-practices'])} |\n`;
    comment += `| SEO | ${formatScore(prLighthouse.seo)} |\n\n`;
    
    comment += `### ⚡ Core Web Vitals\n`;
    comment += `| Metric | Value |\n`;
    comment += `|--------|-------|\n`;
    comment += `| First Contentful Paint | ${formatTime(prLighthouse['first-contentful-paint'])} |\n`;
    comment += `| Largest Contentful Paint | ${formatTime(prLighthouse['largest-contentful-paint'])} |\n`;
    comment += `| Cumulative Layout Shift | ${(prLighthouse['cumulative-layout-shift'] || 0).toFixed(3)} |\n`;
    comment += `| Total Blocking Time | ${formatTime(prLighthouse['total-blocking-time'])} |\n\n`;
  }
  
  // Code quality section
  comment += `### 🔍 Code Quality\n`;
  comment += `| Check | Result |\n`;
  comment += `|--------|--------|\n`;
  comment += `| ESLint | ${(prEslint.error_count || 0) === 0 ? '✅' : '❌'} ${prEslint.error_count || 0} errors, ${prEslint.warning_count || 0} warnings |\n`;
  comment += `| TypeScript | ${prTypescript.status === 'success' ? '✅ No errors' : `❌ ${prTypescript.error_count || 0} errors`} |\n`;
  comment += `| Files analyzed | ${prEslint.total_files || 0} files |\n\n`;
  
  // Summary with intelligent warnings
  const hasIssues = (prEslint.error_count || 0) > 0 || (prTypescript.error_count || 0) > 0;
  const bundleIncreased = (prBundle.total_size_kb || 0) > (baselineBundle.total_size_kb || 0) * 1.05; // 5% threshold
  const coverageDecreased = (prCoverage.lines || 0) < (baselineCoverage.lines || 0) - 1; // 1% threshold
  
  comment += `### 📋 Summary\n`;
  if (!hasIssues && !bundleIncreased && !coverageDecreased) {
    comment += `🎉 **All metrics look good!** No issues detected.\n\n`;
  } else {
    comment += `⚠️ **Action may be needed:**\n`;
    if (hasIssues) comment += `- Code quality issues detected\n`;
    if (bundleIncreased) comment += `- Bundle size increased significantly (>5%)\n`;
    if (coverageDecreased) comment += `- Code coverage decreased (>1%)\n`;
    comment += `\n`;
  }
  
  comment += `<sub>Generated by GitHub Actions • ${new Date().toISOString()}</sub>`;
  
  return comment;
};

/**
 * Main execution function
 */
const main = () => {
  try {
    console.log('🚀 Generating PR metrics comment...');
    
    // Load all metrics files
    const metrics = {
      prCoverage: loadJson('./pr-metrics/coverage-metrics.json', { statements: 0, branches: 0, functions: 0, lines: 0 }),
      baselineCoverage: loadJson('./baseline-metrics/coverage-metrics.json', { statements: 0, branches: 0, functions: 0, lines: 0 }),
      prBundle: loadJson('./pr-metrics/bundle-stats.json', { js_size_kb: 0, css_size_kb: 0, total_chunks: 0, total_size_kb: 0 }),
      baselineBundle: loadJson('./baseline-metrics/bundle-stats.json', { js_size_kb: 0, css_size_kb: 0, total_chunks: 0, total_size_kb: 0 }),
      prLighthouse: loadJson('./pr-metrics/lighthouse-metrics.json'),
      prEslint: loadJson('./pr-metrics/eslint-metrics.json', { total_files: 0, error_count: 0, warning_count: 0, files_with_issues: 0 }),
      prTypescript: loadJson('./pr-metrics/typescript-metrics.json', { status: 'success', error_count: 0 })
    };
    
    // Generate comment
    const comment = generateComment(metrics);
    
    // Write to file
    fs.writeFileSync('pr-comment.md', comment);
    console.log('✅ PR comment generated successfully');
    
    // Output summary to console
    console.log('\n📊 Metrics Summary:');
    console.log(`- Coverage: ${(metrics.prCoverage.lines || 0).toFixed(1)}%`);
    console.log(`- Bundle Size: ${formatSize(metrics.prBundle.total_size_kb)}`);
    console.log(`- ESLint: ${metrics.prEslint.error_count || 0} errors, ${metrics.prEslint.warning_count || 0} warnings`);
    console.log(`- TypeScript: ${metrics.prTypescript.status}`);
    
  } catch (error) {
    console.error('❌ Error generating PR comment:', error.message);
    process.exit(1);
  }
};

// Only run if this file is executed directly
if (require.main === module) {
  main();
}

module.exports = { generateComment, formatChange, formatScore, formatSize, formatTime, loadJson };
