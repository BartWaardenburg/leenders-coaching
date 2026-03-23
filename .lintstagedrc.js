module.exports = {
  'packages/leenders-coaching-nl/src/**/*.{ts,tsx,js,jsx}': [
    'oxfmt --write',
    'oxlint --fix',
  ],
  'packages/studio-leenders-coaching-nl/**/*.{ts,tsx,js,jsx}': [
    'oxfmt --write',
  ],
  '**/*.json': ['oxfmt --write'],
  '**/*.md': ['oxfmt --write'],
  '**/*.{yml,yaml}': ['oxfmt --write'],
  'packages/**/*.{css,scss}': ['oxfmt --write'],
};
