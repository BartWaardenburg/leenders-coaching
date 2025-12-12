import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from '@/utilities/sanity';

/**
 * Internal builder that respects crop + hotspot when width/height are set
 * Let Sanity CDN pick the best format for the browser (WebP/AVIF) and control quality
 */
const builder = createImageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

/**
 * Generate a custom loader function for Next.js Image component
 * This allows Next.js to request different sizes from Sanity's CDN
 * @param source - Sanity image source
 * @param quality - Image quality (1-100)
 * @returns Loader function for Next.js Image
 */
export const createSanityLoader = (source: SanityImageSource, quality = 75) => {
  return ({ width }: { src: string; width: number }) => {
    return urlFor(source)
      .width(width)
      .quality(quality)
      .auto('format')
      .fit('max')
      .url();
  };
};

/**
 * Extract LQIP (Low Quality Image Placeholder) from Sanity image metadata
 * @param source - Sanity image source with metadata
 * @returns Base64 LQIP string or null
 */
export const getLQIP = (
  source: SanityImageSource & { asset?: { metadata?: { lqip?: string } } }
): string | null => {
  return source?.asset?.metadata?.lqip || null;
};

/**
 * Extract image dimensions from Sanity image metadata
 * @param source - Sanity image source with metadata
 * @returns Dimensions object or null
 */
export const getImageDimensions = (
  source: SanityImageSource & {
    asset?: {
      metadata?: {
        dimensions?: { width: number; height: number; aspectRatio: number };
      };
    };
  }
) => {
  return source?.asset?.metadata?.dimensions || null;
};

/**
 * Extract dominant color from Sanity image palette
 * @param source - Sanity image source with metadata
 * @returns Dominant color hex string or null
 */
export const getDominantColor = (
  source: SanityImageSource & {
    asset?: {
      metadata?: {
        palette?: { dominant?: { background?: string } };
      };
    };
  }
) => {
  return source?.asset?.metadata?.palette?.dominant?.background || null;
};
