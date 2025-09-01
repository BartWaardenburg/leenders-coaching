module.exports = {
  // Frontend package TypeScript/JavaScript files
  'packages/leenders-coaching-nl/src/**/*.{ts,tsx,js,jsx}': [
    'prettier --write',
    (filenames) => {
      const relativeFiles = filenames.map(f => f.replace('packages/leenders-coaching-nl/', ''));
      return `cd packages/leenders-coaching-nl && npx eslint --fix ${relativeFiles.join(' ')}`;
    }
  ],
  
  // Studio package TypeScript/JavaScript files - if any exist
  'packages/studio-leenders-coaching-nl/**/*.{ts,tsx,js,jsx}': [
    'prettier --write',
    (filenames) => {
      const relativeFiles = filenames.map(f => f.replace('packages/studio-leenders-coaching-nl/', ''));
      return `cd packages/studio-leenders-coaching-nl && npx eslint --fix ${relativeFiles.join(' ')}`;
    }
  ],
  
  // JSON files across the monorepo
  '**/*.json': [
    'prettier --write'
  ],
  
  // Markdown files across the monorepo
  '**/*.md': [
    'prettier --write'
  ],
  
  // YAML files (GitHub workflows, etc.)
  '**/*.{yml,yaml}': [
    'prettier --write'
  ],

  // CSS files in packages
  'packages/**/*.{css,scss}': [
    'prettier --write'
  ]
};
