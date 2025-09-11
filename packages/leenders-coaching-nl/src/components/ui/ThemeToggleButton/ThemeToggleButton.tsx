'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import { IconToggleButton } from '@/components/ui/IconToggleButton';
import { uiConfig } from '@/config/ui.config';
import { iconPaths } from '@/config/icons.config';

type ThemeToggleButtonProps = {
  className?: string;
};

/**
 * Button to toggle between light and dark theme
 * Handles mounting state to prevent hydration mismatches
 */
export const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  className,
}) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Handle mounting state to prevent hydration mismatches */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* Calculate isDark consistently with useTheme hook logic */
  const isDark =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  /* Don't render until mounted to prevent hydration mismatch */
  if (!mounted) {
    return (
      <IconToggleButton
        isToggled={false}
        defaultIcon={iconPaths.theme.sun}
        toggledIcon={iconPaths.theme.moon}
        label={uiConfig.themeToggle.label}
        onClick={() => {}}
        className={className}
        speed="slow"
      />
    );
  }

  return (
    <IconToggleButton
      isToggled={isDark}
      defaultIcon={iconPaths.theme.sun}
      toggledIcon={iconPaths.theme.moon}
      label={uiConfig.themeToggle.label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={className}
      speed="slow"
    />
  );
};
