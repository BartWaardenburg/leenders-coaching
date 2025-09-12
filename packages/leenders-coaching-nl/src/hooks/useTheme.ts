import { useTheme as useNextTheme } from 'next-themes';

/**
 * Hook for theme switching functionality
 * @returns Object containing theme state and controls
 * @returns theme - Current theme ('light', 'dark', or 'system')
 * @returns setTheme - Function to change the theme
 * @returns systemTheme - System theme preference
 * @returns isDark - Boolean indicating if dark mode is active
 */
export const useTheme = () => {
  const { theme, setTheme, systemTheme, ...rest } = useNextTheme();

  return {
    theme,
    setTheme,
    systemTheme,
    ...rest,
    isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark'),
  };
};
