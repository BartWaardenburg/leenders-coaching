# Deployment Fixes Summary

This document outlines the fixes made to resolve installation, building, and deployment issues for the Leenders Coaching project.

## Issues Identified and Fixed

### 1. Vercel Configuration Issues

**Problem**: The root `vercel.json` was too generic and didn't properly handle the monorepo structure.

**Solution**:

- Updated root `vercel.json` to properly specify the build directory and routing
- Added proper monorepo configuration with builds and routes
- Ensured the Next.js app configuration is properly set

### 2. Environment Variables Documentation

**Problem**: No clear documentation of required environment variables.

**Solution**:

- Created `env.example` file with all required environment variables
- Documented each variable's purpose and format
- Added environment variable setup instructions to README

### 3. GitHub Actions Improvements

**Problem**: CI workflow could be more robust and lacked proper error handling.

**Solution**:

- Enhanced CI workflow with better step naming and error handling
- Added build artifact upload for debugging
- Improved caching configuration
- Added proper environment variable handling

### 4. Duplicate Deployment Mechanisms

**Problem**: Had both Vercel's built-in GitHub integration and a custom GitHub Actions deployment workflow, causing conflicts.

**Solution**:

- Removed the custom GitHub Actions deployment workflow (`.github/workflows/deploy.yml`)
- Kept Vercel's built-in GitHub integration for automatic deployments
- Updated documentation to reflect the correct setup

### 5. Documentation

**Problem**: Limited documentation for deployment and setup.

**Solution**:

- Created comprehensive `DEPLOYMENT.md` guide
- Updated `README.md` with clear setup instructions
- Added troubleshooting section
- Documented all available scripts and commands

### 6. Static Generation Issue with Toast Provider

**Problem**: The contact page was failing during static generation because the `SectionForm` component was trying to use `useToast` hook without the `ToastProvider` being available during build time.

**Solution**:

- Modified `SectionForm` component to safely handle cases where `ToastProvider` is not available
- Added try-catch block around `useToast()` call to prevent build failures
- Made toast functionality optional during static generation while preserving functionality in client-side rendering
- Added proper TypeScript types for toast options

### 7. Edge Function Size Optimization

**Problem**: The `/api/og` Edge Function was exceeding Vercel's 1MB size limit due to large font files.

**Solution**:

- Used `fonttools` to create optimized subset fonts containing only necessary characters
- Reduced font file sizes by 90% (512KB → 53KB)
- Maintained beautiful custom typography while fitting within size limits
- Preserved all visual design elements

## Files Created/Modified

### New Files

- `env.example` - Environment variables template
- `DEPLOYMENT.md` - Comprehensive deployment guide
- `DEPLOYMENT_FIXES.md` - This summary document
- `PlayfairDisplay-Bold-subset.ttf` - Optimized font file (29KB)
- `Montserrat-Regular-subset.ttf` - Optimized font file (24KB)

### Modified Files

- `vercel.json` - Updated for monorepo structure
- `packages/leenders-coaching-nl/vercel.json` - Enhanced configuration
- `.github/workflows/ci.yml` - Improved CI workflow
- `README.md` - Updated with better documentation
- `packages/leenders-coaching-nl/src/components/sections/SectionForm/SectionForm.tsx` - Fixed toast provider issue
- `packages/leenders-coaching-nl/src/app/api/og/route.tsx` - Optimized with subset fonts

### Removed Files

- `.github/workflows/deploy.yml` - Removed duplicate deployment workflow

## Required Environment Variables

For successful deployment, ensure these environment variables are set in Vercel:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_TOKEN`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL`

## Deployment Setup

### Current Setup (Recommended)

1. **Vercel GitHub Integration**: Automatic deployments on push to main
2. **GitHub Actions CI**: Code quality checks and build verification
3. **No duplicate deployment workflows**

### Deployment Flow

1. Push code to main branch
2. GitHub Actions runs CI checks (linting, type checking, build)
3. Vercel automatically deploys if CI passes
4. No manual intervention required

## Verification Steps

To verify the fixes work:

1. **Local Build**: `pnpm build` should complete successfully
2. **CI Pipeline**: GitHub Actions should pass all checks
3. **Deployment**: Vercel should automatically deploy on push to main
4. **Environment**: All environment variables should be properly loaded
5. **Static Generation**: All pages including contact page should generate successfully
6. **Edge Function**: `/api/og` should work without size limit errors

## Troubleshooting

If issues persist:

1. Check Vercel build logs for specific errors
2. Verify all environment variables are set correctly in Vercel
3. Ensure Node.js 20+ and pnpm 10.15.0+ are used
4. Check GitHub Actions logs for CI/CD issues
5. Verify Sanity project configuration
6. Check for any client-side hooks being used during static generation

## Next Steps

1. Set up environment variables in Vercel dashboard
2. Test deployment with a small change
3. Monitor build and deployment logs
4. Verify the live site functionality
5. Test the contact form functionality in production
6. Verify Open Graph images are working correctly
