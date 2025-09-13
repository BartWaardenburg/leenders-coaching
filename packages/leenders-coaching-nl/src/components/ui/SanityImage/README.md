# SanityImage Component

A production-ready Sanity image component that leverages Sanity's CDN for optimal performance.

## Features

- **Real blur-up**: Uses LQIP (Low Quality Image Placeholder) from Sanity metadata
- **Hotspot & crop support**: Automatically respects Sanity's focal point and crop settings
- **Responsive images**: Custom loader generates responsive URLs from Sanity's CDN
- **Modern formats**: Automatic WebP/AVIF format negotiation via `auto=format`
- **No Next server work**: Images stream directly from Sanity's CDN
- **Dominant color backgrounds**: Uses Sanity's color palette for smooth loading

## Usage

### Basic Usage

```tsx
import { SanityImage } from '@/components/ui/SanityImage';

<SanityImage
  image={sanityImageObject}
  alt="Description of the image"
  width={800}
  height={600}
/>;
```

### Hero Image (Above-the-fold)

```tsx
<SanityImage
  image={heroImage}
  alt={heroImage?.alt}
  priority
  sizes="100vw"
  className="h-[60svh] w-full object-cover"
  followHotspot
  fill
/>
```

### Content Images

```tsx
<SanityImage
  image={post.cover}
  alt={post.cover?.alt}
  sizes="(max-width: 768px) 100vw, 768px"
  className="rounded-xl shadow-sm"
/>
```

### With Hotspot Following

```tsx
<SanityImage
  image={image}
  alt={image?.alt}
  fill
  followHotspot={true}
  className="object-cover"
/>
```

## Props

| Prop            | Type                | Default   | Description                       |
| --------------- | ------------------- | --------- | --------------------------------- |
| `image`         | `SanityImageSource` | -         | Sanity image object with metadata |
| `alt`           | `string`            | -         | Alt text for accessibility        |
| `followHotspot` | `boolean`           | `false`   | Align crop to Sanity's hotspot    |
| `qualityHint`   | `number`            | `75`      | Quality hint for CDN (1-100)      |
| `sizes`         | `string`            | `'100vw'` | Responsive sizes                  |
| `priority`      | `boolean`           | `false`   | Prioritize loading                |
| `fill`          | `boolean`           | `false`   | Use fill layout                   |
| `className`     | `string`            | -         | CSS classes                       |

## Migration from Legacy Components

Replace old image usage:

```tsx
// Old way (legacy)
<Image src={sanityImageUrl} alt="..." />

// New way
<SanityImage image={sanityImage} alt="..." />
```

## GROQ Query Requirements

Make sure your GROQ queries include image metadata:

```groq
image {
  asset-> {
    ...,
    metadata {
      lqip,
      dimensions {
        width,
        height,
        aspectRatio
      },
      palette {
        dominant {
          background
        }
      }
    }
  },
  hotspot,
  crop,
  alt
}
```

## Schema Requirements

Ensure your Sanity schemas have alt fields:

```ts
{
  name: 'image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Beschrijf de inhoud van de afbeelding (voor toegankelijkheid)',
      validation: (Rule) => Rule.required().min(3),
    },
  ],
}
```
