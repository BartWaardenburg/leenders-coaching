'use client';

import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { SanityImage } from '@/components/ui/SanityImage';
import {
  isSanityImage,
  isAccessibleImage,
  isStaticImage,
  isValidImage,
  type ImageSource,
} from '@/utilities/image';

type ImageRendererProps = Omit<NextImageProps, 'src' | 'alt'> & {
  /** Image source - can be Sanity image, accessible image, static image, or URL string */
  image: ImageSource;
  /** Alt text for accessibility */
  alt: string;
  /** Whether to follow Sanity hotspot for cropping */
  followHotspot?: boolean;
  /** Quality hint for Sanity images (1-100) */
  qualityHint?: number;
  /** Fallback component to render when image is invalid */
  fallback?: React.ReactNode;
};

/**
 * Universal image renderer that handles all image types in the application
 * - Sanity images (with LQIP blur placeholders)
 * - Accessible images (nested structure with alt text)
 * - Static images and URL strings
 * - Proper fallback handling for invalid images
 */
export const ImageRenderer = ({
  image,
  alt,
  followHotspot = false,
  qualityHint = 75,
  fallback,
  className,
  ...props
}: ImageRendererProps) => {
  // Handle invalid images
  if (!isValidImage(image)) {
    return fallback ? <>{fallback}</> : null;
  }

  // Handle accessible image structure (nested with alt/caption)
  if (isAccessibleImage(image)) {
    return (
      <SanityImage
        image={image.image}
        alt={image.alt || alt}
        followHotspot={followHotspot}
        qualityHint={qualityHint}
        className={className}
        {...props}
      />
    );
  }

  // Handle direct Sanity images
  if (isSanityImage(image)) {
    return (
      <SanityImage
        image={image}
        alt={
          (typeof image === 'object' && 'alt' in image ? image.alt : '') || alt
        }
        followHotspot={followHotspot}
        qualityHint={qualityHint}
        className={className}
        {...props}
      />
    );
  }

  // Handle static images and URL strings
  if (isStaticImage(image)) {
    return <NextImage src={image} alt={alt} className={className} {...props} />;
  }

  // Fallback for any other case
  return fallback ? <>{fallback}</> : null;
};
