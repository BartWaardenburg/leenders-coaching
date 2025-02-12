import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

type AvatarSize = 'sm' | 'md' | 'lg' | 'fill';

type AvatarProps = {
  src: string;
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
        className,
      )}
    >
      <Image src={src} alt={alt} fill className="object-cover" {...props} />
    </div>
  );
};
