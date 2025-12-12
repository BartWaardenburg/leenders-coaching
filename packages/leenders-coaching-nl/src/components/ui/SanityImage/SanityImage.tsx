'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';
import {
  createSanityLoader,
  getLQIP,
  getImageDimensions,
  getDominantColor,
} from '@/utilities/image';
import { cn } from '@/utilities/cn';

type SanityImageWithMetadata = SanityImageSource & {
  asset?: {
    metadata?: {
      lqip?: string;
      dimensions?: { width: number; height: number; aspectRatio: number };
      palette?: { dominant?: { background?: string } };
    };
  };
  hotspot?: { x: number; y: number };
  alt?: string;
};

type Props = Omit<NextImageProps, 'src' | 'loader'> & {
  image: SanityImageWithMetadata;
  /** When using fill, align the crop visually to Sanity's hotspot */
  followHotspot?: boolean;
  /** Default JPEG/WebP/AVIF quality hint to the CDN */
  qualityHint?: number;
};

/**
 * Production-ready SanityImage component that leverages Sanity's CDN
 * Features:
 * - Real blur-up using LQIP from Sanity metadata
 * - Hotspot & crop respected automatically
 * - Responsive images via custom loader
 * - Modern formats (WebP/AVIF) via auto=format
 * - No Next server work - images stream directly from Sanity's CDN
 */
export function SanityImage({
  image,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
  followHotspot = false,
  qualityHint = 75,
  ...rest
}: Props) {
  if (!image?.asset) {
    return (
      <div className={cn('bg-muted/30 aspect-video', className)} aria-hidden />
    );
  }

  /* Generate loader function for Next.js Image */
  const loader = createSanityLoader(image, qualityHint);

  /* Get base image URL for src (Next.js will use loader for different sizes) */
  const baseUrl = loader({ src: '', width: 1200 });

  /* Extract LQIP for blur placeholder */
  const blurDataURL = getLQIP(
    image as SanityImageSource & { asset?: { metadata?: { lqip?: string } } }
  );

  /* Calculate object position based on hotspot if requested */
  const objectPosition =
    followHotspot && image?.hotspot
      ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%`
      : undefined;

  /* Get image dimensions for natural sizing */
  const dimensions = getImageDimensions(
    image as SanityImageSource & {
      asset?: {
        metadata?: {
          dimensions?: { width: number; height: number; aspectRatio: number };
        };
      };
    }
  );

  /* Get dominant color for background */
  const dominantColor = getDominantColor(
    image as SanityImageSource & {
      asset?: {
        metadata?: {
          palette?: { dominant?: { background?: string } };
        };
      };
    }
  );

  const common = {
    alt: alt ?? image?.alt ?? '',
    sizes,
    priority,
    fetchPriority: priority ? 'high' : undefined,
    placeholder: blurDataURL ? 'blur' : 'empty',
    blurDataURL: blurDataURL || undefined,
    className,
    style: {
      objectPosition,
      ...(dominantColor && { backgroundColor: dominantColor }),
      ...style,
    },
  } satisfies Partial<NextImageProps>;

  /* If caller uses `fill`, ensure we set position relative on a wrapping container */
  if ('fill' in rest && rest.fill) {
    return (
      <span className="relative block h-full w-full">
        <NextImage src={baseUrl} loader={loader} fill {...common} {...rest} />
      </span>
    );
  }

  /* For fixed dimensions, use natural dimensions if available */
  const width = dimensions?.width || 1200;
  const height = dimensions?.height || Math.round(width * 0.75);

  return (
    <NextImage
      src={baseUrl}
      loader={loader}
      width={width}
      height={height}
      {...common}
      {...rest}
    />
  );
}
