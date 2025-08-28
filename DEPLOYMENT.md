# Deployment Guide

This guide explains how to deploy the Leenders Coaching website to Vercel.

## Prerequisites

- Node.js 20+ installed
- pnpm 9.15.9+ installed
- Vercel account
- Sanity account
- Resend account (for email functionality)

## Environment Variables

Copy `env.example` to `.env.local` and fill in the required values:

```bash
cp env.example .env.local
```

### Required Environment Variables

#### Sanity Configuration

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset (usually "production")
- `NEXT_PUBLIC_SANITY_API_VERSION`: API version (default: "2024-02-14")
- `SANITY_API_TOKEN`: Your Sanity API token with read permissions

#### Email Configuration

- `RESEND_API_KEY`: Your Resend API key for email functionality

#### Application Configuration

- `NEXT_PUBLIC_APP_URL`: Your application URL (default: "https://leenders-coaching.nl")

## Local Development

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

3. Build the project:

   ```bash
   pnpm build
   ```

## Vercel Deployment

### Automatic Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Set up the following environment variables in Vercel:

   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_APP_URL`

3. Configure build settings:

   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build`
   - **Install Command**: `corepack enable && corepack prepare pnpm@9.15.9 --activate && pnpm install`
   - **Output Directory**: `packages/leenders-coaching-nl/.next`

4. Deploy automatically on push to main branch

### Manual Deployment

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy:

   ```bash
   vercel --prod
   ```

## GitHub Actions CI

The project includes a GitHub Actions workflow for CI (Continuous Integration):

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on PRs and pushes to main
  - Installs dependencies
  - Runs linting
  - Performs type checking
  - Builds the project
  - Uploads build artifacts

This workflow ensures code quality but does not handle deployment (that's handled by Vercel's GitHub integration).

## Sanity Studio Deployment

The Sanity Studio is included in the monorepo and can be deployed separately:

1. Navigate to the studio package:

   ```bash
   cd packages/studio-leenders-coaching-nl
   ```

2. Deploy to Sanity:

   ```bash
   pnpm run deploy
   ```

## Troubleshooting

### Build Issues

1. **Node version**: Ensure you're using Node.js 20+
2. **pnpm version**: Ensure you're using pnpm 9.15.9+
3. **Environment variables**: Verify all required environment variables are set
4. **Dependencies**: Run `pnpm install` to ensure all dependencies are installed

### Deployment Issues

1. **Vercel build errors**: Check the build logs in Vercel dashboard
2. **Environment variables**: Verify all environment variables are set in Vercel
3. **Build command**: Ensure the build command is correct for the monorepo structure

### Common Issues

1. **Module not found**: Run `pnpm install` to install dependencies
2. **TypeScript errors**: Run `pnpm type-check` to identify type issues
3. **Linting errors**: Run `pnpm lint` to identify linting issues

## Support

For deployment issues, check:

1. Vercel deployment logs
2. GitHub Actions logs
3. Environment variable configuration
4. Build output in local development
