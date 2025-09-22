import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { StaticImageData } from 'next/image';

/**
 * Type for all possible image sources in the application
 */
export type ImageSource =
  | string
  | StaticImageData
  | SanityImageSource
  | null
  | undefined;

/**
 * Type guard to check if an image source is a valid Sanity image
 */
export const isSanityImage = (
  image: ImageSource
): image is SanityImageSource => {
  return (
    typeof image === 'object' &&
    image !== null &&
    'asset' in image &&
    image.asset !== null &&
    typeof image.asset === 'object' &&
    ('_ref' in image.asset || '_id' in image.asset) // Support both unresolved (_ref) and resolved (_id) assets
  );
};

/**
 * Type guard to check if an image source is a valid accessible image (nested structure)
 */
export const isAccessibleImage = (
  image: ImageSource
): image is { image: SanityImageSource; alt?: string; caption?: string } => {
  return (
    typeof image === 'object' &&
    image !== null &&
    'image' in image &&
    isSanityImage(image.image)
  );
};

/**
 * Type guard to check if an image source is a valid static image or URL
 */
export const isStaticImage = (
  image: ImageSource
): image is string | StaticImageData => {
  return (
    typeof image === 'string' ||
    (typeof image === 'object' &&
      image !== null &&
      'src' in image &&
      typeof (image as StaticImageData).src === 'string')
  );
};

/**
 * Type guard to check if an image source is valid (not null, undefined, or empty string)
 */
export const isValidImage = (image: ImageSource): boolean => {
  if (!image) return false;
  if (typeof image === 'string' && image.trim() === '') return false;
  return true;
};

/**
 * Extracts the Sanity image from an accessible image structure
 */
export const extractSanityImage = (
  image: ImageSource
): SanityImageSource | null => {
  if (isAccessibleImage(image)) {
    return image.image;
  }
  if (isSanityImage(image)) {
    return image;
  }
  return null;
};

/**
 * Extracts alt text from an accessible image structure
 */
export const extractImageAlt = (
  image: ImageSource,
  fallback: string = ''
): string => {
  if (isAccessibleImage(image)) {
    return image.alt || fallback;
  }
  if (isSanityImage(image) && typeof image === 'object' && 'alt' in image) {
    return image.alt || fallback;
  }
  return fallback;
};
