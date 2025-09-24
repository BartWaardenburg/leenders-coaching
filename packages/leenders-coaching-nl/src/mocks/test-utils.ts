/**
 * Test utilities and helpers for consistent testing across the application
 * Contains reusable functions and mocks for testing scenarios
 */
import { vi } from 'vitest';

/**
 * Mock document object for DOM testing
 */
export const mockDocument = {
  createElement: vi.fn(),
  getElementById: vi.fn(),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(),
    },
    style: {
      overflow: '',
    },
  },
  documentElement: {
    classList: {
      add: vi.fn(),
      remove: vi.fn(),
      contains: vi.fn(),
    },
  },
};
