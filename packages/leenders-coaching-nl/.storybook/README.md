# Storybook Configuration

## Next.js Parameters

When creating stories for components that use Next.js routing features (like `useRouter`, `usePathname`, `Link` components with `href`, etc.), you should add Next.js parameters to ensure proper routing context in Storybook.

### When to Use Next.js Parameters

Add `parameters.nextjs` to stories when your component:

- Uses `useRouter()` from `next/navigation`
- Uses `usePathname()` or `useSearchParams()`
- Contains `Link` components with `href` attributes
- Depends on the current route or navigation state
- Uses Next.js App Router features

### Configuration Pattern

```typescript
export const MyStory: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/your-route-path',
      },
    },
  },
  args: {
    // your story args
  },
};
```

### Examples

#### For Components with Links

```typescript
// When your component has Link components with href attributes
export const WithNavigation: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/coaching',
      },
    },
  },
  args: {
    // args that include href attributes
  },
};
```

#### For Components using useRouter

```typescript
// When your component uses useRouter() hook
const meta: Meta<typeof MyComponent> = {
  title: 'UI/MyComponent',
  component: MyComponent,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog/sample-post',
      },
    },
  },
};
```

### Available Options

- `appDirectory: true` - Enables App Router mode
- `navigation.pathname` - Sets the current pathname for routing context
- `navigation.query` - Sets query parameters (optional)
- `navigation.asPath` - Sets the full path including query (optional)

### Best Practices

1. **Set realistic pathnames** that match your actual routes
2. **Use different pathnames** for different story scenarios when appropriate
3. **Add to meta-level** for components that always need routing context
4. **Add to story-level** for specific routing scenarios
5. **Test navigation behavior** in Storybook to ensure it works correctly

This ensures that your components behave correctly in Storybook's isolated environment and that routing-dependent features work as expected.
