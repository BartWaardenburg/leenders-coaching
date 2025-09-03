# Reusable GitHub Actions Workflows

This directory contains reusable workflows that help reduce duplication across GitHub Actions workflows.

## Available Reusable Workflows

### 1. Setup Workflow (`.github/workflows/setup.yml`)

Handles common setup tasks:

- Node.js setup
- pnpm setup and caching
- Dependency installation
- Cache key generation

**Usage:**

```yaml
jobs:
  setup:
    uses: ./.github/workflows/setup.yml
    with:
      node-version: '22' # Optional, defaults to '22'
      pnpm-version: '10.15.1' # Optional, defaults to '10.15.1'
      install-command: 'ci:install:frozen' # Optional, defaults to 'ci:install:frozen'
      cache-key: '' # Optional, custom cache key
      working-directory: '' # Optional, working directory for install
```

**Outputs:**

- `cache-key`: Generated cache key for pnpm store
- `pnpm-store-path`: Path to pnpm store

### 2. Build Workflow (`.github/workflows/build.yml`)

Handles building packages:

- Package building with customizable commands
- Bundle analysis (optional)
- Build verification
- Artifact packaging and upload (optional)

**Usage:**

```yaml
jobs:
  build-frontend:
    uses: ./.github/workflows/build.yml
    with:
      package-name: 'frontend' # Required
      package-filter: 'leenders-coaching-nl' # Required
      build-command: 'build' # Optional, defaults to 'build'
      verify-command: 'verify:build' # Optional, defaults to 'verify:build'
      analyze-bundle: true # Optional, defaults to false
      analyze-command: 'analyze:bundle' # Optional, defaults to 'analyze:bundle'
      package-build: true # Optional, defaults to false
      package-command: 'package:build' # Optional, defaults to 'package:build'
      working-directory: '' # Optional
    secrets:
      NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
      NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
      NEXT_PUBLIC_SANITY_API_VERSION: ${{ secrets.NEXT_PUBLIC_SANITY_API_VERSION }}
      SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
      RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

### 3. Test Workflow (`.github/workflows/test.yml`)

Handles testing and quality checks:

- Security audits
- Quality checks
- Test execution
- Coverage upload
- Test result artifacts

**Usage:**

```yaml
jobs:
  test:
    uses: ./.github/workflows/test.yml
    with:
      test-command: 'ci:test' # Optional, defaults to 'ci:test'
      quality-command: 'ci:quality' # Optional, defaults to 'ci:quality'
      security-command: 'ci:security' # Optional, defaults to 'ci:security'
      coverage-upload: true # Optional, defaults to true
      working-directory: '' # Optional
    secrets:
      CODECOV_TOKEN: ${{ secrets.CODECOV_TOKEN }}
      NEXT_PUBLIC_SANITY_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_SANITY_PROJECT_ID }}
      NEXT_PUBLIC_SANITY_DATASET: ${{ secrets.NEXT_PUBLIC_SANITY_DATASET }}
      NEXT_PUBLIC_SANITY_API_VERSION: ${{ secrets.NEXT_PUBLIC_SANITY_API_VERSION }}
      SANITY_API_TOKEN: ${{ secrets.SANITY_API_TOKEN }}
      RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
```

## Benefits

1. **Reduced Duplication**: Common setup, build, and test steps are centralized
2. **Consistency**: All workflows use the same versions and commands
3. **Maintainability**: Updates to common steps only need to be made in one place
4. **Flexibility**: Customizable inputs allow workflows to adapt to different needs
5. **Caching**: Optimized pnpm caching across all workflows

## Migration Guide

To migrate existing workflows to use these reusable workflows:

1. **Replace setup steps** with calls to `setup.yml`
2. **Replace build steps** with calls to `build.yml`
3. **Replace test steps** with calls to `test.yml`
4. **Update job dependencies** to reference the new job names
5. **Pass required secrets** to the reusable workflows

## Example Migration

**Before:**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - uses: pnpm/action-setup@v4
        with:
          version: '10.15.1'
      - run: pnpm install
      - run: pnpm run build
```

**After:**

```yaml
jobs:
  setup:
    uses: ./.github/workflows/setup.yml

  build:
    uses: ./.github/workflows/build.yml
    needs: setup
    with:
      package-name: 'my-package'
      package-filter: 'my-package'
```
