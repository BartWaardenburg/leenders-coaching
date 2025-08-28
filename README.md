# Leenders Coaching

A modern coaching website built with Next.js, Sanity CMS, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10.15.0+

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
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

   Edit `.env.local` and add your configuration values.

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

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
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions:

1. Check the [deployment guide](./DEPLOYMENT.md)
2. Review environment variable configuration
3. Check build logs in Vercel dashboard
4. Verify all dependencies are installed correctly
