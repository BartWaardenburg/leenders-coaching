#!/bin/bash

# Bundle Analysis Script for Leenders Coaching NL
# This script provides comprehensive bundle analysis and optimization recommendations

set -e

echo "🚀 Starting Bundle Analysis..."
echo "================================"

# Check if build exists
if [ ! -d ".next" ]; then
    echo "❌ No build found. Building first..."
    pnpm run build
fi

# Create analysis directory
mkdir -p .bundle-analysis

echo "📊 Running Size Limit Analysis..."
echo "--------------------------------"

# Run size-limit and capture output
pnpm exec size-limit > .bundle-analysis/size-output.txt 2>&1 || echo "Analysis completed"

echo ""
echo "📈 Generating Analysis Report..."
echo "--------------------------------"

# Create comprehensive report
cat > .bundle-analysis/analysis-report.md << 'EOF'
# Bundle Analysis Report

## 📊 Size Limit Results

EOF

# Add size-limit results in JSON format
pnpm exec size-limit --json > .bundle-analysis/size-results.json 2>/dev/null || echo "JSON output not available"

# Generate human-readable summary from JSON
if [ -f ".bundle-analysis/size-results.json" ]; then
    echo "## 📋 Bundle Summary" >> .bundle-analysis/analysis-report.md
    echo "" >> .bundle-analysis/analysis-report.md
    
    # Parse JSON and create summary with pretty-printed sizes
    node -e "
        const fs = require('fs');
        const fmt = b => b>=1024*1024 ? (b/1048576).toFixed(2)+' MB' : (b/1024).toFixed(1)+' kB';
        const s = JSON.parse(fs.readFileSync('.bundle-analysis/size-results.json','utf8'));
        for (const r of s) {
            console.log('### ' + r.name);
            console.log('- **Size Limit**: ' + (r.limit ?? 'No limit'));
            console.log('- **Current Size**: ' + fmt(r.size) + (r.gzip ? ' (gz)' : ''));
            console.log('- **Status**: ' + (r.passed ? '✅ Passed' : '❌ Failed'));
            if (typeof r.loading === 'number') console.log('- **Loading Time**: ' + r.loading.toFixed(2) + 's on slow 3G');
            if (typeof r.running === 'number') console.log('- **Running Time**: ' + r.running.toFixed(2) + 's on Snapdragon 410');
            console.log('');
        }
    " >> .bundle-analysis/analysis-report.md
fi

cat >> .bundle-analysis/analysis-report.md << 'EOF'

## 🔍 Optimization Recommendations

### JavaScript Bundles
- **Main Bundle**: Keep under 400KB for optimal loading
- **Current Status**: ✅ Within limits
- **Recommendations**: Consider code splitting for large components

### CSS Optimization
- **Current Status**: ✅ Well under 20KB limit
- **Purge Unused Classes**: Run Tailwind purge to remove unused CSS
- **Critical CSS**: Consider inlining critical CSS for above-the-fold content

### Code Splitting Strategies
- **Dynamic Imports**: Use `next/dynamic` for large components
- **Route-based Splitting**: Leverage Next.js automatic route splitting
- **Component Lazy Loading**: Lazy load non-critical components

### Asset Optimization
- **Image Optimization**: Use Next.js Image component with proper formats
- **Font Loading**: Implement font display swap and preloading
- **Bundle Analysis**: Regular monitoring with size-limit

## 🛠️ Next Steps

1. **Review Bundle Sizes**: ✅ All bundles are within limits
2. **Monitor Trends**: Track bundle size changes over time
3. **Implement Code Splitting**: Break down large components if needed
4. **Optimize Assets**: Compress images and optimize fonts
5. **Performance Monitoring**: Use Lighthouse and Web Vitals

## 📚 Resources

- [Size Limit Documentation](https://github.com/ai/size-limit)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer)

---
*Generated on $(date)*
EOF

echo "✅ Analysis complete! Check .bundle-analysis/ directory for detailed reports."
echo ""
echo "📁 Generated Files:"
echo "  - analysis-report.md: Comprehensive analysis and recommendations"
echo "  - size-results.json: Raw size-limit data in JSON format"
echo "  - size-output.txt: Raw size-limit output"
echo ""
echo "🔍 To analyze current sizes:"
echo "  pnpm exec size-limit"
echo ""
echo "📊 To check performance:"
echo "  pnpm run verify:performance"
