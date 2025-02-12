'use client';

import { useTheme } from 'next-themes';
import type { FC } from 'react';

import { IconToggleButton } from '@/components/ui/IconToggleButton';
import { uiConfig } from '@/config/ui.config';
import { iconPaths } from '@/config/icons.config';

type ThemeToggleButtonProps = {
  className?: string;
};

/**
 * Button to toggle between light and dark theme
 */
export const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  className,
}) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

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
