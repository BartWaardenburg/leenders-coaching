import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import logoColor from '@/assets/images/logo-color.png';
import logoWhite from '@/assets/images/logo-white.png';

/**
 * Logo component that switches between color and white variants based on theme
 * Uses a fixed aspect ratio container to ensure consistent cropping
 * Handles mounting state to prevent hydration mismatches
 */
export const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Handle mounting state to prevent hydration mismatches */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Calculate isDark consistently with useTheme hook logic */
  const isDark =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  /* Don't render theme-dependent content until mounted to prevent hydration mismatch */
  if (!mounted) {
    return (
      <Link
        href="/"
        className="relative block w-52 aspect-[3/1] overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={logoColor}
            alt="Simone Leenders Coaching"
            width={936}
            height={312}
            sizes="(max-width: 768px) 208px, 208px"
            className="object-cover w-full"
            priority
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className="relative block w-52 aspect-[3/1] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={isDark ? logoWhite : logoColor}
          alt="Simone Leenders Coaching"
          width={936}
          height={312}
          sizes="(max-width: 768px) 208px, 208px"
          className="object-cover w-full"
          priority
        />
      </div>
    </Link>
  );
};
