'use client';

import Image from 'next/image';
import type { Image as SanityImageType } from 'sanity';
import { generateImageProps, generatePictureProps } from '@/lib/image';
import { twMerge } from 'tailwind-merge';

type ImageProps = {
  /** Sanity image source */
  image: SanityImageType;
  /** Alt text for accessibility */
  alt?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
  /** CSS classes */
  className?: string;
  /** Whether to prioritize loading */
  priority?: boolean;
  /** Responsive sizes */
  sizes?: string;
  /** Whether to use picture element for multiple formats */
  usePicture?: boolean;
  /** Custom quality setting */
  quality?: number;
  /** Test ID for testing */
  testid?: string;
};

/**
 * Optimized Image component with Sanity integration
 * Supports hotspots, modern formats (AVIF/WebP), and blur-up placeholders
 */
export const SanityImage = ({
  image,
  alt = '',
  width = 800,
  height = 600,
  className,
  priority = false,
  sizes = '100vw',
  usePicture = false,
  quality = 75,
  testid,
}: ImageProps) => {
  if (!image?.asset) {
    return (
      <div
        className={twMerge(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  }

  if (usePicture) {
    const pictureProps = generatePictureProps(image, {
      width,
      height,
      alt,
      sizes,
    });

    return (
      <picture className={className} data-testid={testid}>
        {pictureProps.sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            sizes={source.sizes}
          />
        ))}
        <img
          src={pictureProps.img.src}
          alt={pictureProps.img.alt}
          width={pictureProps.img.width}
          height={pictureProps.img.height}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
        />
      </picture>
    );
  }

  const imageProps = generateImageProps(image, {
    width,
    height,
    alt,
    priority,
    sizes,
  });

  return (
    <Image
      {...imageProps}
      className={className}
      quality={quality}
      data-testid={testid}
    />
  );
};

/**
 * Responsive Image component that automatically generates multiple sizes
 */
export const ResponsiveImage = ({
  image,
  alt = '',
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  testid,
}: Omit<ImageProps, 'width' | 'height' | 'usePicture'>) => {
  if (!image?.asset) {
    return (
      <div
        className={twMerge(
          'bg-gray-200 flex items-center justify-center aspect-video',
          className
        )}
      >
        <span className="text-gray-500 text-sm">No image</span>
      </div>
    );
  }

  const imageProps = generateImageProps(image, {
    width: 1200, // Base width for srcSet generation
    height: 800,
    alt,
    priority,
    sizes,
  });

  return (
    <Image
      {...imageProps}
      className={className}
      fill
      style={{ objectFit: 'cover' }}
      data-testid={testid}
    />
  );
};

/**
 * Hero Image component optimized for above-the-fold content
 */
export const HeroImage = ({
  image,
  alt = '',
  className,
}: Omit<ImageProps, 'width' | 'height' | 'priority' | 'usePicture'>) => {
  return (
    <ResponsiveImage
      image={image}
      alt={alt}
      className={className}
      priority={true}
      sizes="100vw"
    />
  );
};
