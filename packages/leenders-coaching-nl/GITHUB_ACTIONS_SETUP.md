# GitHub Actions + Chromatic Integration Setup

This guide explains how to set up GitHub Actions with Chromatic visual testing for your project.

## Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

### 1. Chromatic Project Token

- **Name:** `CHROMATIC_PROJECT_TOKEN`
- **Value:** `chpt_4ec7c5fa03bf057`
- **Description:** Token for Chromatic visual testing service

### 2. Existing Secrets (Already configured)

- `SANITY_API_TOKEN` - Sanity CMS API token
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version
- `RESEND_API_KEY` - Resend email service API key

## How to Add Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the name and value above

## Workflow Configuration

### Main CI Workflow (`.github/workflows/ci.yml`)

This workflow runs on:

- **Pull requests** to `main` branch
- **Push** to `main` branch

**Jobs included:**

1. **Build Job:**
   - Lint code
   - Type check
   - Build Next.js app
   - Build Storybook
   - Upload artifacts

2. **Chromatic Job** (only on pull requests):
   - Runs after build job completes
   - Publishes Storybook to Chromatic
   - Reports visual changes

### Standalone Chromatic Workflow (`.github/workflows/chromatic.yml`)

This workflow runs on:

- **Pull requests** to `main` or `develop` branches
- **Push** to `main` or `develop` branches

**Features:**

- Independent visual testing
- Concurrency control (cancels in-progress runs)
- Full Git history for change detection

## Workflow Behavior

### On Pull Requests

1. **Main CI** runs: lint, type-check, build, Storybook build
2. **Chromatic** runs: visual testing and comparison
3. **Results** are reported in the PR with:
   - Visual change detection
   - Link to Chromatic dashboard
   - Approval/rejection status

### On Push to Main

1. **Main CI** runs: full build and test suite
2. **Chromatic** runs: baseline update (no visual comparison)

## Chromatic Integration Features

### Visual Change Detection

- Automatically detects visual changes in components
- Compares against the baseline (main branch)
- Reports changes in GitHub PR comments

### Storybook Publishing

- Builds and publishes Storybook to Chromatic
- Creates shareable URLs for component documentation
- Enables visual testing across browsers

### Approval Workflow

- Visual changes require approval before merging
- Team members can review and approve changes
- Automatic baseline updates on main branch

## Troubleshooting

### Common Issues

1. **Chromatic token not found:**

   ```
   Error: Chromatic project token not found
   ```

   - Verify `CHROMATIC_PROJECT_TOKEN` secret is set correctly
   - Check that the token has the right permissions

2. **Build failures:**

   ```
   Error: Storybook build failed
   ```

   - Check Storybook configuration
   - Verify all dependencies are installed
   - Review build logs for specific errors

3. **No visual changes detected:**
   - Ensure components have proper stories
   - Check that stories are in the correct format
   - Verify Git history is available (fetch-depth: 0)

### Debugging Steps

1. **Check workflow logs:**
   - Go to **Actions** tab in GitHub
   - Click on the failed workflow
   - Review step-by-step logs

2. **Test locally:**

   ```bash
   # Build Storybook locally
   pnpm build-storybook

   # Test Chromatic locally
   pnpm chromatic
   ```

3. **Verify secrets:**
   - Check that all required secrets are set
   - Ensure token values are correct
   - Verify repository permissions

## Best Practices

### For Developers

1. **Write comprehensive stories** for all components
2. **Use meaningful story names** that describe component states
3. **Review visual changes** before approving PRs
4. **Keep stories up to date** when components change

### For CI/CD

1. **Monitor workflow performance** and optimize as needed
2. **Set up branch protection rules** to require Chromatic approval
3. **Configure team notifications** for visual change alerts
4. **Regularly review and clean up** old Chromatic builds

## Useful Links

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Chromatic GitHub Action](https://github.com/chromaui/chromatic-action)
