import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

import { useTheme as useNextTheme } from 'next-themes';

/**
 * Test suite for useTheme hook
 */
describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return theme from next-themes', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn(),
      systemTheme: 'dark',
      resolvedTheme: 'dark',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('dark');
    expect(result.current.systemTheme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('should return light theme', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      systemTheme: 'light',
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('light');
    expect(result.current.systemTheme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('should return system theme', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
      systemTheme: 'dark',
      resolvedTheme: 'dark',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('system');
    expect(result.current.systemTheme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('should handle setTheme function', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      systemTheme: 'light',
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('should calculate isDark correctly for system theme', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
      systemTheme: 'light',
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);
  });

  it('should pass through additional properties from next-themes', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      systemTheme: 'light',
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.themes).toEqual(['light', 'dark', 'system']);
  });

  it('should handle system theme with light system preference', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
      systemTheme: 'light',
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('system');
    expect(result.current.systemTheme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('should handle undefined theme gracefully', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: undefined,
      setTheme: vi.fn(),
      systemTheme: 'dark',
      resolvedTheme: 'dark',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBeUndefined();
    expect(result.current.systemTheme).toBe('dark');
    expect(result.current.isDark).toBe(false);
  });

  it('should handle undefined systemTheme gracefully', () => {
    vi.mocked(useNextTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn(),
      systemTheme: undefined,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    });

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe('system');
    expect(result.current.systemTheme).toBeUndefined();
    expect(result.current.isDark).toBe(false);
  });
});
