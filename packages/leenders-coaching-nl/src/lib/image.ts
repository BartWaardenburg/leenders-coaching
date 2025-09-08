import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { client } from '@/lib/api/sanity';

/**
 * Create image URL builder instance
 */
const builder = createImageUrlBuilder(client);

/**
 * Generate optimized image URL with hotspot and crop support
 * @param source - Sanity image source
 * @returns Image URL builder instance
 */
export const urlFor = (source: Image) => {
  return builder.image(source);
};

/**
 * Generate responsive image URLs for different screen sizes
 * @param source - Sanity image source
 * @param sizes - Array of width sizes
 * @returns Array of image URLs with sizes
 */
export const generateResponsiveImages = (
  source: Image,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1536]
) => {
  return sizes.map((width) => ({
    width,
    url: urlFor(source)
      .width(width)
      .height(Math.round(width * 0.75)) // 4:3 aspect ratio
      .fit('max')
      .auto('format')
      .url(),
  }));
};

/**
 * Generate modern image formats (AVIF, WebP) with fallback
 * @param source - Sanity image source
 * @param width - Image width
 * @param height - Image height
 * @returns Object with different format URLs
 */
export const generateModernFormats = (
  source: Image,
  width: number,
  height: number
) => {
  const baseImage = urlFor(source).width(width).height(height).fit('max');

  return {
    webp: baseImage.format('webp').url(),
    jpeg: baseImage.format('jpg').url(),
    fallback: baseImage.url(),
  };
};

/**
 * Generate blur-up placeholder from LQIP (Low Quality Image Placeholder)
 * @param source - Sanity image source
 * @returns Base64 encoded blur placeholder
 */
export const generateBlurPlaceholder = (source: Image): string => {
  // Use LQIP from asset metadata if available
  if (source.asset && 'metadata' in source.asset) {
    const metadata = source.asset.metadata as { lqip?: string };
    if (metadata?.lqip) {
      return metadata.lqip;
    }
  }

  // Fallback: generate a simple placeholder
  return urlFor(source).width(20).height(20).blur(20).format('jpg').url();
};

/**
 * Generate optimized image props for Next.js Image component
 * @param source - Sanity image source
 * @param options - Image optimization options
 * @returns Optimized image props
 */
export const generateImageProps = (
  source: Image,
  options: {
    width?: number;
    height?: number;
    alt?: string;
    priority?: boolean;
    sizes?: string;
  } = {}
) => {
  const {
    width = 800,
    height = 600,
    alt = '',
    priority = false,
    sizes = '100vw',
  } = options;

  const formats = generateModernFormats(source, width, height);
  const blurDataURL = generateBlurPlaceholder(source);

  return {
    src: formats.webp, // Use WebP as primary format
    alt,
    width,
    height,
    priority,
    sizes,
    placeholder: 'blur' as const,
    blurDataURL,
    // Add srcSet for responsive images
    srcSet: [`${formats.webp} ${width}w`, `${formats.jpeg} ${width}w`].join(
      ', '
    ),
  };
};

/**
 * Generate picture element with multiple formats
 * @param source - Sanity image source
 * @param options - Image options
 * @returns Picture element props
 */
export const generatePictureProps = (
  source: Image,
  options: {
    width?: number;
    height?: number;
    alt?: string;
    sizes?: string;
  } = {}
) => {
  const { width = 800, height = 600, alt = '', sizes = '100vw' } = options;

  const formats = generateModernFormats(source, width, height);

  return {
    sources: [
      {
        srcSet: formats.webp,
        type: 'image/webp',
        sizes,
      },
    ],
    img: {
      src: formats.jpeg,
      alt,
      width,
      height,
    },
  };
};
