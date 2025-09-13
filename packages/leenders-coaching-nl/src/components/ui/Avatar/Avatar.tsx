import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityImage } from '@/components/ui/SanityImage';

type AvatarSize = 'sm' | 'md' | 'lg' | 'fill';

type AvatarProps = {
  src?: string | StaticImageData | SanityImageSource;
  alt: string;
  size?: AvatarSize;
} & Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'>;

const sizeMap: Record<Exclude<AvatarSize, 'fill'>, number> = {
  sm: 32,
  md: 48,
  lg: 84,
};

/**
 * Avatar component for displaying profile images
 * Supports both static images and Sanity images
 * @param src - Image source (string URL, StaticImageData, or SanityImageSource)
 * @param alt - Alt text for accessibility
 * @param size - "sm" | "md" | "lg" for fixed sizes, or "fill" to fill container
 */
export const Avatar = ({
  src,
  alt,
  size = 'md',
  className,
  ...props
}: AvatarProps) => {
  const style =
    size === 'fill'
      ? undefined
      : { width: sizeMap[size], height: sizeMap[size] };

  return (
    <div
      style={style}
      className={twMerge(
        'relative border border-foreground/80',
        size === 'fill' && 'w-full h-full',
        className
      )}
    >
      {/* Check if src is a Sanity image object or static image/URL */}
      {src && typeof src === 'object' && 'asset' in src ? (
        <SanityImage
          image={src as SanityImageSource}
          alt={alt}
          fill
          className="object-cover"
          followHotspot={true}
          qualityHint={80}
          sizes={`${sizeMap[size as Exclude<AvatarSize, 'fill'>] || 48}px`}
        />
      ) : src ? (
        <Image
          src={src as string | StaticImageData}
          alt={alt}
          fill
          className="object-cover"
          {...props}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">
          <span className="text-xs font-medium">
            {alt.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};
