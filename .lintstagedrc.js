module.exports = {
  'packages/leenders-coaching-nl/src/**/*.{ts,tsx,js,jsx}': [
    'prettier --write',
    (filenames) => {
      const relativeFiles = filenames.map(f => f.replace('packages/leenders-coaching-nl/', ''));
      return `cd packages/leenders-coaching-nl && npx eslint --fix ${relativeFiles.join(' ')}`;
    }
  ],
  'packages/studio-leenders-coaching-nl/**/*.{ts,tsx,js,jsx}': [
    'prettier --write',
    (filenames) => {
      const relativeFiles = filenames.map(f => f.replace('packages/studio-leenders-coaching-nl/', ''));
      return `cd packages/studio-leenders-coaching-nl && npx eslint --fix ${relativeFiles.join(' ')}`;
    }
  ],
  '**/*.json': [
    'prettier --write'
  ],
  '**/*.md': [
    'prettier --write'
  ],
  '**/*.{yml,yaml}': [
    'prettier --write'
  ],
  'packages/**/*.{css,scss}': [
    'prettier --write'
  ]
};
