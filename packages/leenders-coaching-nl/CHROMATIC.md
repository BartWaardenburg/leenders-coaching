# Chromatic Setup

This project uses [Chromatic](https://www.chromatic.com/) for visual testing and component documentation.

## Quick Start

### Local Development

1. **Start Storybook locally:**

   ```bash
   pnpm storybook
   ```

2. **Publish to Chromatic:**
   ```bash
   pnpm chromatic
   ```

### CI/CD Integration

The project includes a GitHub Actions workflow that automatically runs Chromatic tests on:

- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## Available Scripts

- `pnpm chromatic` - Publish Storybook to Chromatic
- `pnpm chromatic:ci` - Publish to Chromatic with exit-zero-on-changes (for CI)

## Configuration

Chromatic is configured via `.chromaticrc.json` with the following settings:

- Project token: `chpt_4ec7c5fa03bf057`
- Storybook build directory: `storybook-static`
- Excluded directories: `node_modules`, `.git`, `dist`, `build`, `.next`, `coverage`

## GitHub Actions Setup

The project includes two GitHub Actions workflows for Chromatic integration:

1. **Integrated CI Workflow** (`.github/workflows/ci.yml`):
   - Runs Chromatic tests on pull requests to `main`
   - Integrated with the main build process
   - Only runs visual testing on PRs (not on main branch pushes)

2. **Standalone Chromatic Workflow** (`.github/workflows/chromatic.yml`):
   - Independent visual testing workflow
   - Runs on both `main` and `develop` branches
   - Includes concurrency control and full Git history

### Required Setup

To enable automated Chromatic testing:

1. Go to your GitHub repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add a new repository secret:
   - Name: `CHROMATIC_PROJECT_TOKEN`
   - Value: `chpt_4ec7c5fa03bf057`

For detailed setup instructions, see [GITHUB_ACTIONS_SETUP.md](./GITHUB_ACTIONS_SETUP.md).

## Viewing Results

- **Local Storybook:** http://localhost:6006
- **Chromatic Dashboard:** https://www.chromatic.com/setup?appId=68b05c21a24d0985c71e54a5
- **Published Storybook:** https://68b05c21a24d0985c71e54a5-fqpgtjrddt.chromatic.com/

## Best Practices

1. **Write comprehensive stories** for all your components
2. **Use meaningful story names** that describe the component state
3. **Include accessibility testing** with the `@storybook/addon-a11y` addon
4. **Review visual changes** in pull requests before merging
5. **Keep stories up to date** when components change

## Troubleshooting

### Common Issues

1. **Build fails with authentication error:**
   - Verify your project token is correct
   - Check that the token has the necessary permissions

2. **Stories not found:**
   - Ensure stories follow the naming pattern: `*.stories.{ts,tsx,js,jsx}`
   - Check that stories are in the correct directory structure

3. **Visual differences in CI:**
   - Ensure consistent environment variables
   - Check for timezone or locale differences
   - Verify that all dependencies are properly installed

### Getting Help

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [GitHub Issues](https://github.com/chromaui/chromatic/issues)
