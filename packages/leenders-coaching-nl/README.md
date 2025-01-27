# Leenders Coaching Website

A modern coaching website built with Next.js 13, Tailwind CSS, and Sanity CMS.

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_TOKEN=
NEXT_PUBLIC_GOOGLE_ANALYTICS=
```

4. Run the development server:

```bash
pnpm dev
```

## Deployment on Vercel

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Configure the following environment variables in Vercel:
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_GOOGLE_ANALYTICS` (optional)
5. Deploy!

## Features

- Modern UI with Tailwind CSS
- Dynamic content management with Sanity CMS
- SEO optimization with Next.js metadata
- Dynamic OG image generation
- Blog with rich text content
- Responsive design
- Dark mode support
- Performance optimized
- Type-safe with TypeScript

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Sanity CMS
- Vercel Hosting
