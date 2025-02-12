import { useTheme as useNextTheme } from 'next-themes';

/**
 * Hook for theme switching functionality
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
