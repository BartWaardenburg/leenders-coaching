# Leenders Coaching

[![Codecov](https://codecov.io/gh/bartwaardenburg/leenders-coaching/branch/main/graph/badge.svg)](https://codecov.io/gh/bartwaardenburg/leenders-coaching)

A modern coaching website built with Next.js, Sanity CMS, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10.15.0+
- A Sanity account (for CMS functionality)
- A Resend account (for email functionality)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bartwaardenburg/leenders-coaching.git
   cd leenders-coaching
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```bash
   # Sanity Configuration (Required)
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-02-14
   SANITY_API_TOKEN=your_sanity_api_token

   # Email Configuration (Required for contact form)
   RESEND_API_KEY=your_resend_api_key

   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Sanity Studio Configuration (for content seeding)
   SANITY_STUDIO_PROJECT_ID=your_sanity_project_id
   SANITY_STUDIO_DATASET=production
   EDITOR_SANITY_AUTH_TOKEN=your_sanity_editor_token
   ```

4. Get Required API Keys:

   **Sanity CMS Setup:**
   - Go to [sanity.io](https://sanity.io) and create an account
   - Create a new project
   - Get your project ID from the project settings
   - Create an API token with read/write permissions
   - Create an editor token for content seeding

   **Resend Email Setup:**
   - Go to [resend.com](https://resend.com) and create an account
   - Get your API key from the dashboard
   - Verify your domain (optional, for production)

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

This is a monorepo containing:

- **`packages/leenders-coaching-nl`**: Next.js frontend application
- **`packages/studio-leenders-coaching-nl`**: Sanity Studio CMS

## 🛠️ Available Scripts

### Root Level

- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages
- `pnpm format` - Format code with Prettier

### Frontend (packages/leenders-coaching-nl)

- `pnpm dev` - Start Next.js development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm storybook` - Start Storybook

### Studio (packages/studio-leenders-coaching-nl)

- `pnpm dev` - Start Sanity Studio development server
- `pnpm build` - Build Sanity Studio
- `pnpm deploy` - Deploy to Sanity
- `pnpm update-types` - Update TypeScript types

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🔧 Environment Variables

Required environment variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-14
SANITY_API_TOKEN=your_sanity_api_token

# Email Configuration
RESEND_API_KEY=your_resend_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=https://leenders-coaching.nl
```

## 🔒 Security

This repository is safe for public access:

- ✅ **No hardcoded secrets** - All sensitive data uses environment variables
- ✅ **Environment files ignored** - `.env*` files are in `.gitignore`
- ✅ **Server-side tokens** - Sensitive tokens only used server-side
- ✅ **Example configuration** - `env.example` shows required variables

**Important**: Never commit your actual environment variables. Always use `.env.local` for local development and set environment variables in your deployment platform (Vercel, etc.).

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with coverage for CI
pnpm test:coverage:ci

# Run tests with UI
pnpm test:ui
```

### Code Coverage

This project uses Codecov for coverage tracking:

- **Target**: 80% overall coverage
- **Status checks**: Coverage must not drop below threshold
- **Reports**: Available in pull requests and Codecov dashboard

[![Codecov](https://codecov.io/gh/bartwaardenburg/leenders-coaching/branch/main/graph/badge.svg)](https://codecov.io/gh/bartwaardenburg/leenders-coaching)

## 📚 Storybook

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 🔍 Code Quality

```bash
# Lint code
pnpm lint

# Type check
pnpm type-check

# Format code
pnpm format
```

## 🚀 Content Management

The project uses Sanity CMS for content management. Access the studio at `/studio` when running in development mode.

### Content Seeding

Various content seeding scripts are available:

```bash
# Seed all pages
pnpm seed:all

# Seed specific pages
pnpm seed:home
pnpm seed:blog-post
pnpm seed:create-home-page
pnpm seed:create-about-page
pnpm seed:create-coaching-page
pnpm seed:create-approach-page
pnpm seed:create-contact-page
pnpm seed:create-blog-page
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Run linting: `pnpm lint`
6. Ensure code coverage is maintained
7. Commit your changes: `git commit -m 'Add amazing feature'`
8. Push to the branch: `git push origin feature/amazing-feature`
9. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Maintain 80%+ code coverage
- Follow existing code patterns
- Use TypeScript for all new code
- Follow the project's ESLint and Prettier configuration

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:

1. Check the [deployment guide](./DEPLOYMENT.md)
2. Review environment variable configuration
3. Check build logs in Vercel dashboard
4. Verify all dependencies are installed correctly
5. Open an issue for bugs or feature requests
6. Check existing issues before creating new ones

## 🔧 CI/CD

This project uses GitHub Actions for continuous integration:

- **Tests & Coverage**: Runs on every push and PR
- **Chromatic**: Visual testing for Storybook components
- **Codecov**: Code coverage tracking and reporting
- **Lighthouse CI**: Performance monitoring with GitHub status checks
- **Vercel**: Automatic deployment on push to main branch

### Required GitHub Secrets

For CI/CD to work properly, set these repository secrets:

- `CHROMATIC_PROJECT_TOKEN` - Your Chromatic project token
- `CODECOV_TOKEN` - Your Codecov repository token
- `SANITY_API_TOKEN` - Your Sanity API token (for content seeding)
- `RESEND_API_KEY` - Your Resend API key (for email functionality)
- `LHCI_GITHUB_APP_TOKEN` - Your Lighthouse CI GitHub App token (for performance monitoring)

### 🚀 Lighthouse CI Setup

To enable performance monitoring with GitHub status checks:

1. **Install the Lighthouse CI GitHub App**:
   - Go to: https://github.com/apps/lighthouse-ci
   - Click "Install" and authorize for your repository
   - Copy the provided app token

2. **Add the token to GitHub Secrets**:
   - Go to Settings → Secrets and variables → Actions
   - Add new secret: `LHCI_GITHUB_APP_TOKEN`
   - Paste the token from step 1

3. **Performance Monitoring Features**:
   - ✅ Automatic performance audits on every PR
   - ✅ GitHub status checks with pass/fail results
   - ✅ Detailed HTML reports via artifacts
   - ✅ Core Web Vitals tracking (LCP, FCP, CLS, TBT)
   - ✅ Accessibility and SEO audits
   - ✅ Production monitoring on main branch

The system tests both Vercel preview deployments (PRs) and production URLs with strict performance budgets.
