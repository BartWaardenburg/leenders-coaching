#!/usr/bin/env node

/**
 * GitHub Actions script to store and retrieve baseline metrics
 * Uses GitHub's cache API to store metrics for comparison
 */

const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

/**
 * Store current metrics as baseline for future comparisons
 */
async function storeBaseline() {
  try {
    const metricsData = {
      timestamp: new Date().toISOString(),
      commit: process.env.GITHUB_SHA,
      branch: process.env.GITHUB_REF_NAME,
      coverage: loadJsonFile('./coverage-summary.json'),
      bundleStats: loadJsonFile('./bundle-stats.json'),
      lighthouse: loadJsonFile('./lighthouse-summary.json'),
      eslint: loadJsonFile('./eslint-summary.json')
    };

    // Store metrics in a simple JSON file that can be cached
    fs.writeFileSync('./baseline-metrics.json', JSON.stringify(metricsData, null, 2));
    
    console.log('✅ Baseline metrics stored successfully');
    console.log(`📊 Metrics for commit: ${metricsData.commit.substring(0, 8)}`);
    
    // Set outputs for GitHub Actions
    core.setOutput('metrics-stored', 'true');
    core.setOutput('metrics-file', './baseline-metrics.json');
    
  } catch (error) {
    console.error('❌ Error storing baseline metrics:', error.message);
    core.setFailed(error.message);
  }
}

/**
 * Retrieve baseline metrics for comparison
 */
async function retrieveBaseline() {
  try {
    const baselineFile = './baseline-metrics.json';
    
    if (fs.existsSync(baselineFile)) {
      const baseline = loadJsonFile(baselineFile);
      console.log('✅ Baseline metrics retrieved successfully');
      console.log(`📊 Baseline from: ${baseline.commit?.substring(0, 8) || 'unknown'}`);
      
      core.setOutput('baseline-found', 'true');
      core.setOutput('baseline-data', JSON.stringify(baseline));
      return baseline;
    } else {
      console.log('⚠️ No baseline metrics found, using empty baseline');
      const emptyBaseline = {
        coverage: { statements: 0, branches: 0, functions: 0, lines: 0 },
        bundleStats: { js_size_kb: 0, css_size_kb: 0, total_chunks: 0, total_size_kb: 0 },
        lighthouse: { performance: 0, accessibility: 0, 'best-practices': 0, seo: 0 },
        eslint: { error_count: 0, warning_count: 0, total_files: 0 }
      };
      
      core.setOutput('baseline-found', 'false');
      core.setOutput('baseline-data', JSON.stringify(emptyBaseline));
      return emptyBaseline;
    }
  } catch (error) {
    console.error('❌ Error retrieving baseline metrics:', error.message);
    core.setFailed(error.message);
  }
}

/**
 * Load JSON file with error handling
 */
function loadJsonFile(filePath, fallback = {}) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
    return fallback;
  } catch (error) {
    console.warn(`⚠️ Could not load ${filePath}:`, error.message);
    return fallback;
  }
}

/**
 * Generate a simple metrics summary
 */
function generateSummary(metrics) {
  return {
    coverage_percentage: metrics.coverage?.lines || 0,
    bundle_size_kb: metrics.bundleStats?.total_size_kb || 0,
    lighthouse_performance: Math.round((metrics.lighthouse?.performance || 0) * 100),
    code_issues: (metrics.eslint?.error_count || 0) + (metrics.eslint?.warning_count || 0)
  };
}

// Main execution
async function main() {
  const action = core.getInput('action') || process.argv[2] || 'store';
  
  console.log(`🚀 Running metrics ${action} action...`);
  
  switch (action) {
    case 'store':
      await storeBaseline();
      break;
    case 'retrieve':
      await retrieveBaseline();
      break;
    case 'summary':
      const metrics = await retrieveBaseline();
      const summary = generateSummary(metrics);
      console.log('📋 Metrics Summary:', JSON.stringify(summary, null, 2));
      core.setOutput('summary', JSON.stringify(summary));
      break;
    default:
      throw new Error(`Unknown action: ${action}. Use 'store', 'retrieve', or 'summary'`);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { storeBaseline, retrieveBaseline, generateSummary, loadJsonFile };
