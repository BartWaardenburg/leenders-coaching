module.exports = {
  // Format and lint TypeScript/JavaScript files in packages
  'packages/**/*.{ts,tsx,js,jsx}': [
    'prettier --write',
    'eslint --fix'
  ],
  
  // Format JSON files
  '**/*.json': [
    'prettier --write'
  ],
  
  // Format Markdown files
  '**/*.md': [
    'prettier --write'
  ],
  
  // Format YAML files
  '**/*.{yml,yaml}': [
    'prettier --write'
  ]
};
