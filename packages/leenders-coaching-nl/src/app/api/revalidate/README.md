# Revalidation API Routes

This directory contains API routes for cache revalidation when content is updated in Sanity Studio.

## Routes

### `/api/revalidate` - Tag-based Revalidation

- **Purpose**: Revalidates cache tags for broad content updates
- **Use Case**: When global content (navigation, footer, settings) changes
- **Method**: POST
- **Security**: Query parameter `secret`

### `/api/revalidate/path` - Path-based Revalidation

- **Purpose**: Surgically revalidates individual pages by their path
- **Use Case**: When specific posts or pages are updated
- **Method**: POST
- **Security**: Uses `parseBody` from `next-sanity/webhook` for signature validation

## Webhook Configuration

### Path-based Revalidation Webhook

Use this webhook template for path-based revalidation:

**URL**: `https://your-domain.com/api/revalidate/path`

**Events**: `create`, `update`, `delete`

**Filter**: `_type in ["post", "homePage", "aboutPage", "coachingPage", "contactPage", "approachPage"]`

**Projection**:

```groq
{
  "path": select(
    _type == "post" => "/blog/" + slug.current,
    _type == "homePage" => "/",
    _type == "aboutPage" => "/over-mij",
    _type == "coachingPage" => "/coaching",
    _type == "contactPage" => "/contact",
    _type == "approachPage" => "/aanpak"
  )
}
```

**HTTP Method**: POST

**Secret**: Same as `SANITY_REVALIDATE_SECRET` environment variable

### Tag-based Revalidation Webhook

Use this webhook template for tag-based revalidation:

**URL**: `https://your-domain.com/api/revalidate`

**Events**: `create`, `update`, `delete`

**Filter**: `_type in ["header", "footer", "configuration", "category"]`

**HTTP Method**: POST

**Secret**: Same as `SANITY_REVALIDATE_SECRET` environment variable

## Benefits of Path-based Revalidation

1. **Surgical Updates**: Only the specific page is revalidated
2. **Longer Cache Times**: Can safely use longer cache times since individual pages can be revalidated on-demand
3. **Reduced Sanity Requests**: Less frequent cache invalidation means fewer API calls
4. **Better Performance**: More granular control over what gets revalidated

## Testing

### Local Development with Ngrok

1. Install ngrok: `npm install -g ngrok`
2. Start your Next.js app: `pnpm dev`
3. In another terminal: `ngrok http 3000`
4. Use the ngrok URL in your webhook configuration
5. Test by updating content in Sanity Studio

### Production Testing

1. Update a blog post in Sanity Studio
2. Check the webhook logs in your deployment platform
3. Verify the specific page is revalidated (cache MISS on next request)
4. Confirm other pages remain cached (cache HIT)

## Troubleshooting

### Stale Data Issues

If you see stale data after revalidation, add a delay to the webhook:

```typescript
const { isValidSignature, body } = await parseBody<WebhookPayload>(
  req,
  process.env.SANITY_REVALIDATE_SECRET,
  true // Add delay to wait for CDN update
);
```

### Webhook Not Firing

1. Check webhook URL is correct
2. Verify secret matches environment variable
3. Ensure webhook is enabled for the correct events
4. Check webhook logs in Sanity project dashboard

### Cache Not Clearing

1. Verify the path being revalidated matches the actual route
2. Check that `revalidatePath` is being called with the correct path
3. Ensure the page is using cached data (not `cache: 'no-store'`)
