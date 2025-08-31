#!/usr/bin/env node

/**
 * Metrics Collection and Processing Script
 * Handles all metrics collection logic for PR and baseline workflows
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Configuration for different metric types
 */
const CONFIG = {
  coverage: {
    file: 'packages/leenders-coaching-nl/coverage/coverage-summary.json',
    output: 'coverage-metrics.json'
  },
  bundle: {
    staticDir: 'packages/leenders-coaching-nl/.next/static',
    output: 'bundle-stats.json'
  },
  lighthouse: {
    dir: 'packages/leenders-coaching-nl/.lighthouseci',
    output: 'lighthouse-metrics.json'
  },
  eslint: {
    output: 'eslint-metrics.json'
  },
  typescript: {
    output: 'typescript-metrics.json'
  }
};

/**
 * Utility functions
 */
const utils = {
  /**
   * Safely read JSON file with fallback
   */
  readJson: (filePath, fallback = {}) => {
    try {
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
    } catch (error) {
      console.warn(`⚠️ Error reading ${filePath}:`, error.message);
    }
    return fallback;
  },

  /**
   * Write JSON file with error handling
   */
  writeJson: (filePath, data) => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`✅ Written: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`❌ Error writing ${filePath}:`, error.message);
      return false;
    }
  },

  /**
   * Execute command with error handling
   */
  exec: (command, options = {}) => {
    try {
      const result = execSync(command, { 
        encoding: 'utf8', 
        stdio: 'pipe',
        ...options 
      });
      return { success: true, output: result };
    } catch (error) {
      return { 
        success: false, 
        output: error.stdout || '', 
        error: error.stderr || error.message 
      };
    }
  },

  /**
   * Calculate directory size in KB
   */
  getDirSize: (dirPath, extension) => {
    if (!fs.existsSync(dirPath)) return 0;
    
    try {
      const result = utils.exec(`find "${dirPath}" -name "*.${extension}" -type f -exec du -b {} + | awk '{sum += $1} END {print (sum > 0 ? int(sum/1024) : 0)}'`);
      return result.success ? parseInt(result.output.trim()) : 0;
    } catch {
      return 0;
    }
  },

  /**
   * Count files in directory
   */
  countFiles: (dirPath, extension) => {
    if (!fs.existsSync(dirPath)) return 0;
    
    try {
      const result = utils.exec(`find "${dirPath}" -name "*.${extension}" -type f | wc -l`);
      return result.success ? parseInt(result.output.trim()) : 0;
    } catch {
      return 0;
    }
  }
};

/**
 * Coverage metrics collector
 */
class CoverageCollector {
  static collect() {
    console.log('📊 Collecting coverage metrics...');
    
    const coverageFile = CONFIG.coverage.file;
    const coverage = utils.readJson(coverageFile, { total: {} });
    
    const metrics = {
      statements: coverage.total?.statements?.pct || 0,
      branches: coverage.total?.branches?.pct || 0,
      functions: coverage.total?.functions?.pct || 0,
      lines: coverage.total?.lines?.pct || 0,
      covered_lines: coverage.total?.lines?.covered || 0,
      total_lines: coverage.total?.lines?.total || 0
    };
    
    utils.writeJson(CONFIG.coverage.output, metrics);
    return metrics;
  }
}

/**
 * Bundle size metrics collector
 */
class BundleCollector {
  static collect() {
    console.log('📦 Collecting bundle size metrics...');
    
    const staticDir = CONFIG.bundle.staticDir;
    const chunksDir = path.join(staticDir, 'chunks');
    const cssDir = path.join(staticDir, 'css');
    
    const jsSize = utils.getDirSize(chunksDir, 'js');
    const cssSize = utils.getDirSize(cssDir, 'css');
    const totalChunks = utils.countFiles(chunksDir, 'js');
    
    const metrics = {
      js_size_kb: jsSize,
      css_size_kb: cssSize,
      total_chunks: totalChunks,
      total_size_kb: jsSize + cssSize,
      timestamp: new Date().toISOString()
    };
    
    utils.writeJson(CONFIG.bundle.output, metrics);
    console.log(`📊 Bundle: JS ${jsSize}KB, CSS ${cssSize}KB, Chunks ${totalChunks}`);
    return metrics;
  }
}

/**
 * Lighthouse metrics collector
 */
class LighthouseCollector {
  static collect() {
    console.log('🚀 Collecting Lighthouse metrics...');
    
    const lhrDir = CONFIG.lighthouse.dir;
    if (!fs.existsSync(lhrDir)) {
      console.log('⚠️ No Lighthouse reports directory found');
      utils.writeJson(CONFIG.lighthouse.output, {});
      return {};
    }
    
    // Find the most recent lighthouse report
    try {
      const files = fs.readdirSync(lhrDir)
        .filter(file => file.startsWith('lhr-') && file.endsWith('.json'))
        .map(file => ({ file, path: path.join(lhrDir, file) }))
        .filter(({ path: filePath }) => fs.existsSync(filePath))
        .sort((a, b) => fs.statSync(b.path).mtime.getTime() - fs.statSync(a.path).mtime.getTime());
      
      if (files.length === 0) {
        console.log('⚠️ No Lighthouse reports found');
        utils.writeJson(CONFIG.lighthouse.output, {});
        return {};
      }
      
      const latestReport = utils.readJson(files[0].path);
      
      const metrics = {
        performance: latestReport.categories?.performance?.score || 0,
        accessibility: latestReport.categories?.accessibility?.score || 0,
        'best-practices': latestReport.categories?.['best-practices']?.score || 0,
        seo: latestReport.categories?.seo?.score || 0,
        'first-contentful-paint': latestReport.audits?.['first-contentful-paint']?.numericValue || 0,
        'largest-contentful-paint': latestReport.audits?.['largest-contentful-paint']?.numericValue || 0,
        'cumulative-layout-shift': latestReport.audits?.['cumulative-layout-shift']?.numericValue || 0,
        'total-blocking-time': latestReport.audits?.['total-blocking-time']?.numericValue || 0,
        'speed-index': latestReport.audits?.['speed-index']?.numericValue || 0,
        timestamp: new Date().toISOString()
      };
      
      utils.writeJson(CONFIG.lighthouse.output, metrics);
      console.log(`✅ Lighthouse metrics collected from ${files[0].file}`);
      return metrics;
      
    } catch (error) {
      console.error('❌ Error processing Lighthouse reports:', error.message);
      utils.writeJson(CONFIG.lighthouse.output, {});
      return {};
    }
  }
}

/**
 * ESLint metrics collector
 */
class ESLintCollector {
  static collect() {
    console.log('🔍 Collecting ESLint metrics...');
    
    const result = utils.exec('pnpm run lint:format', { stdio: 'pipe' });
    
    let metrics = {
      total_files: 0,
      error_count: 0,
      warning_count: 0,
      files_with_issues: 0,
      status: 'success'
    };
    
    if (result.success && result.output) {
      try {
        // Extract JSON from pnpm output
        const jsonStart = result.output.indexOf('[');
        if (jsonStart !== -1) {
          const jsonStr = result.output.substring(jsonStart);
          const eslintResults = JSON.parse(jsonStr);
          
          metrics = {
            total_files: eslintResults.length,
            error_count: eslintResults.reduce((sum, file) => sum + (file.errorCount || 0), 0),
            warning_count: eslintResults.reduce((sum, file) => sum + (file.warningCount || 0), 0),
            files_with_issues: eslintResults.filter(file => (file.errorCount || 0) > 0 || (file.warningCount || 0) > 0).length,
            status: 'success'
          };
        }
      } catch (error) {
        console.warn('⚠️ Error parsing ESLint output:', error.message);
        metrics.status = 'parse_error';
      }
    } else {
      metrics.status = 'execution_error';
    }
    
    utils.writeJson(CONFIG.eslint.output, metrics);
    console.log(`📊 ESLint: ${metrics.error_count} errors, ${metrics.warning_count} warnings in ${metrics.total_files} files`);
    return metrics;
  }
}

/**
 * TypeScript metrics collector
 */
class TypeScriptCollector {
  static collect() {
    console.log('🔧 Collecting TypeScript metrics...');
    
    const result = utils.exec('pnpm run type-check', { stdio: 'pipe' });
    
    const metrics = {
      status: result.success ? 'success' : 'error',
      error_count: 0,
      timestamp: new Date().toISOString()
    };
    
    if (!result.success && result.error) {
      // Count TypeScript errors
      const errorMatches = result.error.match(/error TS\d+/g);
      metrics.error_count = errorMatches ? errorMatches.length : 0;
    }
    
    utils.writeJson(CONFIG.typescript.output, metrics);
    console.log(`📊 TypeScript: ${metrics.status}${metrics.error_count > 0 ? ` (${metrics.error_count} errors)` : ''}`);
    return metrics;
  }
}

/**
 * Main metrics collection orchestrator
 */
class MetricsCollector {
  static async collectAll() {
    console.log('🚀 Starting comprehensive metrics collection...\n');
    
    const startTime = Date.now();
    
    try {
      // Collect all metrics
      const coverage = CoverageCollector.collect();
      const bundle = BundleCollector.collect();
      const lighthouse = LighthouseCollector.collect();
      const eslint = ESLintCollector.collect();
      const typescript = TypeScriptCollector.collect();
      
      // Create consolidated metrics file
      const consolidated = {
        timestamp: new Date().toISOString(),
        coverage,
        bundle,
        lighthouse,
        eslint,
        typescript,
        collection_time_ms: Date.now() - startTime
      };
      
      utils.writeJson('metrics-summary.json', consolidated);
      
      console.log('\n✅ Metrics collection completed successfully!');
      console.log(`⏱️ Total time: ${Date.now() - startTime}ms`);
      
      return consolidated;
      
    } catch (error) {
      console.error('❌ Metrics collection failed:', error.message);
      process.exit(1);
    }
  }
  
  static collectSpecific(type) {
    switch (type) {
      case 'coverage':
        return CoverageCollector.collect();
      case 'bundle':
        return BundleCollector.collect();
      case 'lighthouse':
        return LighthouseCollector.collect();
      case 'eslint':
        return ESLintCollector.collect();
      case 'typescript':
        return TypeScriptCollector.collect();
      default:
        console.error(`❌ Unknown metric type: ${type}`);
        process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'all':
      MetricsCollector.collectAll();
      break;
    case 'coverage':
    case 'bundle':
    case 'lighthouse':
    case 'eslint':
    case 'typescript':
      MetricsCollector.collectSpecific(command);
      break;
    default:
      console.log('Usage: node metrics-collector.js <command>');
      console.log('Commands: all, coverage, bundle, lighthouse, eslint, typescript');
      process.exit(1);
  }
}

module.exports = {
  MetricsCollector,
  CoverageCollector,
  BundleCollector,
  LighthouseCollector,
  ESLintCollector,
  TypeScriptCollector,
  utils
};
