#!/bin/bash

# Test script that runs the exact workflow commands
echo "🧪 Testing Actual Workflow Commands"
echo "==================================="

# Simulate the workflow environment
cd packages/leenders-coaching-nl

echo "📦 Step 1: Check for outdated packages"
echo "--------------------------------------"
pnpm outdated --format json > outdated.json 2>/dev/null || echo "{}" > outdated.json
echo "outdated.json created with $(wc -l < outdated.json) lines"

echo
echo "📦 Step 2: Run dedupe check"
echo "----------------------------"
pnpm dedupe --check 2>&1 | tee dedupe.txt || echo "No dedupe changes needed" > dedupe.txt
echo "dedupe.txt created with $(wc -l < dedupe.txt) lines"

echo
echo "📦 Step 3: Check for deprecated packages"
echo "----------------------------------------"
pnpm list --depth=0 2>&1 | grep -i "deprecated" > deprecated.txt || echo "No deprecated packages found" > deprecated.txt
echo "deprecated.txt created with $(wc -l < deprecated.txt) lines"

echo
echo "📄 File contents:"
echo "================="
echo "outdated.json:"
cat outdated.json | head -5
echo
echo "dedupe.txt:"
cat dedupe.txt | head -10
echo
echo "deprecated.txt:"
cat deprecated.txt

echo
echo "🔍 Testing the actual extraction logic:"
echo "======================================="

# Test the exact workflow logic for deprecated packages
if grep -q "deprecated" deprecated.txt; then
  echo "### ⚠️ Deprecated Packages"
  echo "| Package | Current Version | Status |"
  echo "|---|---|---|"
  
  # Extract specific deprecated package information
  grep -i "deprecated" deprecated.txt | sed 's/.*found: //' | tr ',' '\n' | sed 's/^[[:space:]]*//' | grep -v "^$" | head -15 | while IFS= read -r package; do
    if [[ "$package" =~ ^([^@]+)@([^@]+) ]]; then
      pkg_name="${BASH_REMATCH[1]}"
      pkg_version="${BASH_REMATCH[2]}"
      echo "| $pkg_name | $pkg_version | 🔴 Deprecated |"
    fi
  done
  
  echo
  echo "_Action required:_ Update or replace deprecated packages"
else
  echo "✅ No deprecated packages found"
fi

# Clean up
cd /Users/bartwaardenburg/Sites/leenders-coaching
rm -f packages/leenders-coaching-nl/outdated.json packages/leenders-coaching-nl/dedupe.txt packages/leenders-coaching-nl/deprecated.txt

echo
echo "✅ Actual workflow test completed!"
