# ISR + On-Demand Revalidation Setup

This setup provides optimal performance for your Next.js application with Sanity CMS by using Incremental Static Regeneration (ISR) with on-demand revalidation via webhooks.

## Setup Overview

The setup consists of:

1. **Optimized Sanity Clients**: Separate clients for published (CDN-enabled) vs draft content
2. **Tagged Data Fetches**: Using cache tags to enable targeted revalidation
3. **Revalidation API Endpoint**: Handles Sanity webhooks to trigger cache invalidation
4. **Sanity Webhook Configuration**: Configures Sanity to call the revalidation endpoint

## Environment Variables Required

Add these environment variables to your Vercel deployment:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_WEBHOOK_SECRET=your_actual_secret_value
SANITY_API_TOKEN=your_sanity_auth_token
```

## Sanity Webhook Configuration

**Important**: In Sanity Studio webhook settings:

- **URL**: `https://your-domain.com/api/revalidate`
- **Secret**: Use your **actual secret value** (e.g., `sk_live_abc123`), **NOT** the environment variable name
- **Filter**: `_type in ["post", "homePage", "aboutPage", "coachingPage", "contactPage", "approachPage", "page", "header", "footer", "configuration", "category"]`
- **Events**: create, update, delete, unpublish

**Note**: The secret value in Vercel (`SANITY_WEBHOOK_SECRET`) must match exactly what you enter in Sanity Studio.

## Client Optimization

The setup uses separate Sanity clients for optimal performance:

- **`publishedClient`**: No token, CDN enabled - Used for published content fetches
- **`draftClient`**: With token, CDN disabled - Used only when `draftMode` is true
- **Benefit**: Published content uses Sanity's global CDN for faster response times

This ensures:

- ✅ **CDN caching** for all published content
- ✅ **No unnecessary API calls** for public data
- ✅ **Proper draft access** only when needed

## How It Works

### 1. Tagged Data Fetches

Use the `sanityFetchTagged` function in your pages/components:

```typescript
import { sanityFetchTagged } from '@/utilities/sanity';

const post = await sanityFetchTagged<ResolvedBlogPost>({
  query: `*[_type == "post" && slug.current == $slug && defined(title)][0] { ... }`,
  params: { slug },
  tags: ['post', `post:${slug}`], // Tags for revalidation
});
```

### 2. Revalidation Endpoint

The `/api/revalidate` endpoint handles Sanity webhooks and:

- Validates the webhook signature
- Revalidates cache tags based on content type and slug
- Revalidates specific paths for immediate updates

### 3. Sanity Webhook Configuration

Configure a webhook in your Sanity project with:

- **URL**: `https://your-domain.com/api/revalidate`
- **Secret**: Your `SANITY_WEBHOOK_SECRET`
- **Filter**: `_type in ["post", "homePage", "aboutPage", "coachingPage", "contactPage", "approachPage", "page", "header", "footer", "configuration", "category"]`
- **Projection**: `{"_type": _type, "slug": slug.current, "path": select(_type == "post" => "/blog/" + slug.current, _type == "homePage" => "/", _type == "aboutPage" => "/over-mij", _type == "coachingPage" => "/coaching", _type == "contactPage" => "/contact", _type == "approachPage" => "/aanpak", _type == "page" => "/" + slug.current, _type in ["header", "footer", "configuration"] => null)}`
- **Events**: create, update, delete, unpublish

## Content Types Handled

### Posts & Blog

- **Posts**: `/blog/[slug]` - Tagged with `['post', 'posts', 'blog', 'post:${slug}']`
- **Categories**: `/blog/categorie/[slug]` - Tagged with `['category', 'categories', 'category:${slug}']`
- **Blog listing**: `/blog` - Tagged with `['post', 'posts', 'blog']`

### Pages

- **Home**: `/` - Tagged with `['homePage', 'homepage', 'home']`
- **About**: `/over-mij` - Tagged with `['aboutPage', 'aboutpage']`
- **Coaching**: `/coaching` - Tagged with `['coachingPage', 'coachingpage']`
- **Contact**: `/contact` - Tagged with `['contactPage', 'contactpage']`
- **Approach**: `/aanpak` - Tagged with `['approachPage', 'approachpage']`
- **Generic pages**: `/${slug}` - Tagged with `['page', 'pages']`

### Global Content

- **Header**: Affects all pages - Tagged with `['header', 'navigation', 'global']`
- **Footer**: Affects all pages - Tagged with `['footer', 'global']`
- **Site Settings**: Affects all pages - Tagged with `['configuration', 'settings', 'global']`

## Benefits

- **No Redeploys**: Content updates happen instantly via webhooks
- **Targeted Revalidation**: Only affected pages are revalidated
- **Better Performance**: Static generation with on-demand updates
- **Granular Control**: Tag-based revalidation for different content types
- **Comprehensive Coverage**: Handles all content types in your project

## When to Use Full Redeploy

Only use a Vercel Deploy Hook if:

- You precompute routes in `generateStaticParams` and don't revalidate them
- You change code, environment variables, or schema affecting build output
- You need a complete cache flush

## Testing the Setup

1. Update any content in Sanity Studio (post, page, or global content)
2. Check that the webhook triggers (check Vercel function logs)
3. Verify that only the specific content and affected pages are revalidated
4. Confirm the page shows updated content immediately

## Example Revalidation Behavior

**When a blog post is updated:**

- Revalidates tag: `post:${slug}`
- Revalidates path: `/blog/${slug}`
- Only that specific blog post page is updated

**When global content (header/footer) is updated:**

- Revalidates tags: `['header', 'footer', 'configuration', 'global', 'navigation', 'settings']`
- Revalidates path: `/`
- All pages that use global content are updated

**When a page is updated:**

- Revalidates tag: `${_type}` (e.g., `homePage`)
- Revalidates path: `/${corresponding-path}`
- Only that specific page is updated
