#!/usr/bin/env node

/**
 * Integration Test Script
 * Tests the complete metrics collection and comment generation pipeline
 */

const fs = require('fs');
const path = require('path');

// Import the modules we want to test
const { MetricsCollector, utils } = require('./metrics-collector.js');
const { generateComment, loadJson } = require('./generate-pr-comment.js');

/**
 * Test utilities
 */
const testUtils = {
  /**
   * Create mock data for testing
   */
  createMockData: () => {
    const mockCoverage = {
      statements: 85.5,
      branches: 78.2,
      functions: 92.1,
      lines: 87.3,
      covered_lines: 1234,
      total_lines: 1413
    };

    const mockBundle = {
      js_size_kb: 245,
      css_size_kb: 67,
      total_chunks: 12,
      total_size_kb: 312,
      timestamp: new Date().toISOString()
    };

    const mockLighthouse = {
      performance: 0.92,
      accessibility: 0.98,
      'best-practices': 0.95,
      seo: 0.89,
      'first-contentful-paint': 1200,
      'largest-contentful-paint': 2100,
      'cumulative-layout-shift': 0.05,
      'total-blocking-time': 150,
      'speed-index': 1800,
      timestamp: new Date().toISOString()
    };

    const mockEslint = {
      total_files: 45,
      error_count: 0,
      warning_count: 3,
      files_with_issues: 2,
      status: 'success'
    };

    const mockTypescript = {
      status: 'success',
      error_count: 0,
      timestamp: new Date().toISOString()
    };

    return {
      coverage: mockCoverage,
      bundle: mockBundle,
      lighthouse: mockLighthouse,
      eslint: mockEslint,
      typescript: mockTypescript
    };
  },

  /**
   * Write test files
   */
  writeTestFiles: (data, prefix = 'test') => {
    const testDir = './test-metrics';
    
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Write individual metric files
    utils.writeJson(`${testDir}/${prefix}-coverage-metrics.json`, data.coverage);
    utils.writeJson(`${testDir}/${prefix}-bundle-stats.json`, data.bundle);
    utils.writeJson(`${testDir}/${prefix}-lighthouse-metrics.json`, data.lighthouse);
    utils.writeJson(`${testDir}/${prefix}-eslint-metrics.json`, data.eslint);
    utils.writeJson(`${testDir}/${prefix}-typescript-metrics.json`, data.typescript);

    return testDir;
  },

  /**
   * Clean up test files
   */
  cleanup: (testDir) => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  },

  /**
   * Assert function for testing
   */
  assert: (condition, message) => {
    if (!condition) {
      throw new Error(`❌ Assertion failed: ${message}`);
    }
    console.log(`✅ ${message}`);
  }
};

/**
 * Test metrics collector functionality
 */
async function testMetricsCollector() {
  console.log('\n🧪 Testing Metrics Collector...');
  
  try {
    // Test individual collectors
    const mockData = testUtils.createMockData();
    
    // Test CoverageCollector
    const coverageCollector = require('./metrics-collector.js').CoverageCollector;
    testUtils.assert(typeof coverageCollector.collect === 'function', 'CoverageCollector.collect is a function');
    
    // Test BundleCollector
    const bundleCollector = require('./metrics-collector.js').BundleCollector;
    testUtils.assert(typeof bundleCollector.collect === 'function', 'BundleCollector.collect is a function');
    
    // Test LighthouseCollector
    const lighthouseCollector = require('./metrics-collector.js').LighthouseCollector;
    testUtils.assert(typeof lighthouseCollector.collect === 'function', 'LighthouseCollector.collect is a function');
    
    // Test ESLintCollector
    const eslintCollector = require('./metrics-collector.js').ESLintCollector;
    testUtils.assert(typeof eslintCollector.collect === 'function', 'ESLintCollector.collect is a function');
    
    // Test TypeScriptCollector
    const typescriptCollector = require('./metrics-collector.js').TypeScriptCollector;
    testUtils.assert(typeof typescriptCollector.collect === 'function', 'TypeScriptCollector.collect is a function');
    
    // Test MetricsCollector
    testUtils.assert(typeof MetricsCollector.collectAll === 'function', 'MetricsCollector.collectAll is a function');
    testUtils.assert(typeof MetricsCollector.collectSpecific === 'function', 'MetricsCollector.collectSpecific is a function');
    
    console.log('✅ Metrics Collector tests passed');
    
  } catch (error) {
    console.error('❌ Metrics Collector test failed:', error.message);
    throw error;
  }
}

/**
 * Test comment generation functionality
 */
async function testCommentGeneration() {
  console.log('\n💬 Testing Comment Generation...');
  
  try {
    const mockData = testUtils.createMockData();
    const testDir = testUtils.writeTestFiles(mockData, 'pr');
    
    // Create baseline data with slightly different values
    const baselineData = {
      coverage: { ...mockData.coverage, lines: 86.0 },
      bundle: { ...mockData.bundle, total_size_kb: 300 },
      lighthouse: { ...mockData.lighthouse, performance: 0.90 },
      eslint: { ...mockData.eslint, error_count: 1 },
      typescript: { ...mockData.typescript, error_count: 0 }
    };
    testUtils.writeTestFiles(baselineData, 'baseline');
    
    // Test loadJson function
    const loadedCoverage = loadJson(`${testDir}/pr-coverage-metrics.json`);
    testUtils.assert(loadedCoverage.lines === 87.3, 'loadJson correctly loads coverage data');
    
    // Test comment generation
    const metrics = {
      prCoverage: loadedCoverage,
      baselineCoverage: loadJson(`${testDir}/baseline-coverage-metrics.json`),
      prBundle: loadJson(`${testDir}/pr-bundle-stats.json`),
      baselineBundle: loadJson(`${testDir}/baseline-bundle-stats.json`),
      prLighthouse: loadJson(`${testDir}/pr-lighthouse-metrics.json`),
      prEslint: loadJson(`${testDir}/pr-eslint-metrics.json`),
      prTypescript: loadJson(`${testDir}/pr-typescript-metrics.json`)
    };
    
    const comment = generateComment(metrics);
    testUtils.assert(typeof comment === 'string', 'generateComment returns a string');
    testUtils.assert(comment.includes('📊 PR Metrics Report'), 'Comment contains expected header');
    testUtils.assert(comment.includes('🧪 Code Coverage'), 'Comment contains coverage section');
    testUtils.assert(comment.includes('📦 Bundle Size'), 'Comment contains bundle section');
    testUtils.assert(comment.includes('🚀 Lighthouse Scores'), 'Comment contains lighthouse section');
    testUtils.assert(comment.includes('🔍 Code Quality'), 'Comment contains quality section');
    
    // Test file writing
    fs.writeFileSync(`${testDir}/test-comment.md`, comment);
    testUtils.assert(fs.existsSync(`${testDir}/test-comment.md`), 'Comment file was written successfully');
    
    console.log('✅ Comment Generation tests passed');
    
    // Cleanup
    testUtils.cleanup(testDir);
    
  } catch (error) {
    console.error('❌ Comment Generation test failed:', error.message);
    throw error;
  }
}

/**
 * Test utility functions
 */
async function testUtilities() {
  console.log('\n🔧 Testing Utilities...');
  
  try {
    // Test utils.readJson
    const testData = { test: 'value' };
    const testFile = './test-utils.json';
    fs.writeFileSync(testFile, JSON.stringify(testData));
    
    const loaded = utils.readJson(testFile);
    testUtils.assert(loaded.test === 'value', 'utils.readJson correctly reads JSON');
    
    // Test utils.writeJson
    const writeData = { write: 'test' };
    const writeFile = './test-write.json';
    const writeResult = utils.writeJson(writeFile, writeData);
    testUtils.assert(writeResult === true, 'utils.writeJson returns true on success');
    testUtils.assert(fs.existsSync(writeFile), 'utils.writeJson creates file');
    
    // Test utils.readJson with fallback
    const fallback = utils.readJson('./non-existent-file.json', { default: 'value' });
    testUtils.assert(fallback.default === 'value', 'utils.readJson uses fallback for missing files');
    
    // Cleanup
    fs.unlinkSync(testFile);
    fs.unlinkSync(writeFile);
    
    console.log('✅ Utilities tests passed');
    
  } catch (error) {
    console.error('❌ Utilities test failed:', error.message);
    throw error;
  }
}

/**
 * Test file naming consistency
 */
async function testFileNamingConsistency() {
  console.log('\n📁 Testing File Naming Consistency...');
  
  try {
    const mockData = testUtils.createMockData();
    const testDir = testUtils.writeTestFiles(mockData, 'pr');
    
    // Check that all expected files exist
    const expectedFiles = [
      'pr-coverage-metrics.json',
      'pr-bundle-stats.json',
      'pr-lighthouse-metrics.json',
      'pr-eslint-metrics.json',
      'pr-typescript-metrics.json'
    ];
    
    expectedFiles.forEach(file => {
      const filePath = path.join(testDir, file);
      testUtils.assert(fs.existsSync(filePath), `Expected file exists: ${file}`);
    });
    
    // Check that files contain valid JSON
    expectedFiles.forEach(file => {
      const filePath = path.join(testDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      testUtils.assert(typeof parsed === 'object', `File contains valid JSON: ${file}`);
    });
    
    console.log('✅ File naming consistency tests passed');
    
    // Cleanup
    testUtils.cleanup(testDir);
    
  } catch (error) {
    console.error('❌ File naming consistency test failed:', error.message);
    throw error;
  }
}

/**
 * Test workflow integration simulation
 */
async function testWorkflowIntegration() {
  console.log('\n🔄 Testing Workflow Integration...');
  
  try {
    const mockData = testUtils.createMockData();
    const testDir = testUtils.writeTestFiles(mockData, 'pr');
    
    // Simulate PR metrics collection
    const prMetrics = {
      coverage: loadJson(`${testDir}/pr-coverage-metrics.json`),
      bundle: loadJson(`${testDir}/pr-bundle-stats.json`),
      lighthouse: loadJson(`${testDir}/pr-lighthouse-metrics.json`),
      eslint: loadJson(`${testDir}/pr-eslint-metrics.json`),
      typescript: loadJson(`${testDir}/pr-typescript-metrics.json`)
    };
    
    // Simulate baseline metrics (slightly different)
    const baselineMetrics = {
      coverage: { ...prMetrics.coverage, lines: prMetrics.coverage.lines - 2 },
      bundle: { ...prMetrics.bundle, total_size_kb: prMetrics.bundle.total_size_kb - 20 },
      lighthouse: { ...prMetrics.lighthouse, performance: prMetrics.lighthouse.performance - 0.05 },
      eslint: { ...prMetrics.eslint, error_count: 1 },
      typescript: { ...prMetrics.typescript, error_count: 0 }
    };
    
    // Write baseline files
    utils.writeJson(`${testDir}/baseline-coverage-metrics.json`, baselineMetrics.coverage);
    utils.writeJson(`${testDir}/baseline-bundle-stats.json`, baselineMetrics.bundle);
    utils.writeJson(`${testDir}/baseline-lighthouse-metrics.json`, baselineMetrics.lighthouse);
    utils.writeJson(`${testDir}/baseline-eslint-metrics.json`, baselineMetrics.eslint);
    utils.writeJson(`${testDir}/baseline-typescript-metrics.json`, baselineMetrics.typescript);
    
    // Generate comment
    const metrics = {
      prCoverage: prMetrics.coverage,
      baselineCoverage: baselineMetrics.coverage,
      prBundle: prMetrics.bundle,
      baselineBundle: baselineMetrics.bundle,
      prLighthouse: prMetrics.lighthouse,
      prEslint: prMetrics.eslint,
      prTypescript: prMetrics.typescript
    };
    
    const comment = generateComment(metrics);
    
    // Verify comment contains expected content
    testUtils.assert(comment.includes('📊 PR Metrics Report'), 'Comment contains main header');
    testUtils.assert(comment.includes('🧪 Code Coverage'), 'Comment contains coverage section');
    testUtils.assert(comment.includes('📦 Bundle Size'), 'Comment contains bundle section');
    testUtils.assert(comment.includes('🚀 Lighthouse Scores'), 'Comment contains lighthouse section');
    testUtils.assert(comment.includes('🔍 Code Quality'), 'Comment contains quality section');
    testUtils.assert(comment.includes('📋 Summary'), 'Comment contains summary section');
    
    // Verify metrics are displayed correctly
    testUtils.assert(comment.includes('87.3%'), 'Coverage percentage is displayed');
    testUtils.assert(comment.includes('312 KB'), 'Bundle size is displayed');
    testUtils.assert(comment.includes('🟢 92%'), 'Lighthouse performance is displayed');
    
    console.log('✅ Workflow integration tests passed');
    
    // Cleanup
    testUtils.cleanup(testDir);
    
  } catch (error) {
    console.error('❌ Workflow integration test failed:', error.message);
    throw error;
  }
}

/**
 * Main test runner
 */
async function runAllTests() {
  console.log('🚀 Starting Integration Tests...\n');
  
  const tests = [
    testUtilities,
    testMetricsCollector,
    testCommentGeneration,
    testFileNamingConsistency,
    testWorkflowIntegration
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      await test();
      passed++;
    } catch (error) {
      failed++;
      console.error(`\n❌ Test failed: ${error.message}`);
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed. Please check the integration.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! The integration is working correctly.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('❌ Test runner failed:', error.message);
    process.exit(1);
  });
}

module.exports = {
  testMetricsCollector,
  testCommentGeneration,
  testUtilities,
  testFileNamingConsistency,
  testWorkflowIntegration,
  runAllTests
};
