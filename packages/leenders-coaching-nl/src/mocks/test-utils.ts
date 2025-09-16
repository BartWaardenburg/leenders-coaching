/**
 * Test utilities and helpers for consistent testing across the application
 * Contains reusable functions and mocks for testing scenarios
 */

import { vi } from 'vitest';
import React from 'react';

/**
 * Mock Next.js router for consistent testing
 */
export const mockNextRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  refresh: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  pathname: '/blog/sample-post',
  searchParams: new URLSearchParams(),
};

/**
 * Mock Next.js navigation hooks
 */
export const mockNextNavigation = {
  useRouter: () => mockNextRouter,
  usePathname: () => '/blog/sample-post',
  useSearchParams: () => new URLSearchParams(),
};

/**
 * Mock React Email components for email testing
 */
export const mockReactEmailComponents = {
  Html: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'html' }, children),
  Body: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'body' }, children),
  Container: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'container' }, children),
  Text: ({ children }: { children: React.ReactNode }) =>
    React.createElement('p', {}, children),
  Preview: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'preview' }, children),
  Section: ({ children }: { children: React.ReactNode }) =>
    React.createElement('section', {}, children),
  Hr: () => React.createElement('hr', {}),
  Head: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'head' }, children),
  Row: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'row' }, children),
  Column: ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'column' }, children),
  Heading: ({ children }: { children: React.ReactNode }) =>
    React.createElement('h1', {}, children),
  Button: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href, 'data-testid': 'button' }, children),
  Link: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
  Img: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement('img', { src, alt, 'data-testid': 'img' }),
};

/**
 * Mock Sanity client for testing
 */
export const mockSanityClient = {
  fetch: vi.fn(),
  listen: vi.fn(),
  getDocument: vi.fn(),
  getDocuments: vi.fn(),
  create: vi.fn(),
  createOrReplace: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
  transaction: vi.fn(),
  mutate: vi.fn(),
  observable: vi.fn(),
  withConfig: vi.fn(),
};

/**
 * Mock fetch for API testing
 */
export const mockFetch = vi.fn();

/**
 * Mock environment variables for testing
 */
export const mockEnv = {
  NODE_ENV: 'test',
  STORYBOOK: 'true',
  VITEST: 'true',
  NEXT_PUBLIC_SANITY_PROJECT_ID: 'test-project',
  NEXT_PUBLIC_SANITY_DATASET: 'test',
  NEXT_PUBLIC_SANITY_API_VERSION: '2024-02-14',
  SANITY_API_TOKEN: 'test-token',
  RESEND_API_KEY: 'test-resend-key',
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
};

/**
 * Mock window object for browser testing
 */
export const mockWindow = {
  location: {
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
  },
  history: {
    pushState: vi.fn(),
    replaceState: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    go: vi.fn(),
  },
  scrollTo: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

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

/**
 * Mock localStorage for storage testing
 */
export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

/**
 * Mock sessionStorage for storage testing
 */
export const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

/**
 * Mock IntersectionObserver for intersection testing
 */
export const mockIntersectionObserver = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
};

/**
 * Mock ResizeObserver for resize testing
 */
export const mockResizeObserver = {
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
};

/**
 * Mock matchMedia for media query testing
 */
export const mockMatchMedia = vi.fn((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

/**
 * Mock requestAnimationFrame for animation testing
 */
export const mockRequestAnimationFrame = vi.fn(
  (callback: FrameRequestCallback) => {
    setTimeout(callback, 16);
    return 1;
  }
);

/**
 * Mock cancelAnimationFrame for animation testing
 */
export const mockCancelAnimationFrame = vi.fn();

/**
 * Mock setTimeout for timer testing
 */
export const mockSetTimeout = vi.fn((callback: () => void, delay: number) => {
  setTimeout(callback, delay);
  return 1;
});

/**
 * Mock clearTimeout for timer testing
 */
export const mockClearTimeout = vi.fn();

/**
 * Mock setInterval for interval testing
 */
export const mockSetInterval = vi.fn((callback: () => void, delay: number) => {
  setInterval(callback, delay);
  return 1;
});

/**
 * Mock clearInterval for interval testing
 */
export const mockClearInterval = vi.fn();

/**
 * Mock Date for date testing
 */
export const mockDate = new Date('2024-01-15T10:00:00Z');

/**
 * Mock console methods for testing
 */
export const mockConsole = {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  debug: vi.fn(),
};

/**
 * Setup function to initialize all mocks
 */
export const setupMocks = () => {
  // Mock global objects
  global.fetch = mockFetch;
  global.window = mockWindow as unknown as typeof window;
  global.document = mockDocument as unknown as typeof document;
  global.localStorage = mockLocalStorage as unknown as typeof localStorage;
  global.sessionStorage =
    mockSessionStorage as unknown as typeof sessionStorage;
  global.IntersectionObserver =
    mockIntersectionObserver as unknown as typeof IntersectionObserver;
  global.ResizeObserver =
    mockResizeObserver as unknown as typeof ResizeObserver;
  global.matchMedia = mockMatchMedia;
  global.requestAnimationFrame = mockRequestAnimationFrame;
  global.cancelAnimationFrame = mockCancelAnimationFrame;
  global.setTimeout = mockSetTimeout as unknown as typeof setTimeout;
  global.clearTimeout = mockClearTimeout as unknown as typeof clearTimeout;
  global.setInterval = mockSetInterval as unknown as typeof setInterval;
  global.clearInterval = mockClearInterval as unknown as typeof clearInterval;
  global.Date = vi.fn(() => mockDate) as unknown as typeof Date;
  global.console = mockConsole as unknown as typeof console;

  // Mock environment variables
  Object.assign(process.env, mockEnv);
};

/**
 * Cleanup function to reset all mocks
 */
export const cleanupMocks = () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
};

/**
 * Wait for animations to complete
 */
export const waitForAnimationsToComplete = async (_testId: string) => {
  // Wait for any pending animations
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Wait for any pending DOM updates
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Wait for any pending microtasks
  await new Promise((resolve) => setTimeout(resolve, 0));
};

/**
 * Create a mock element with test ID
 */
export const createMockElement = (testId: string, content?: string) => {
  const element = document.createElement('div');
  element.setAttribute('data-testid', testId);
  if (content) {
    element.textContent = content;
  }
  return element;
};

/**
 * Mock user interaction events
 */
export const mockUserEvents = {
  click: vi.fn(),
  focus: vi.fn(),
  blur: vi.fn(),
  change: vi.fn(),
  input: vi.fn(),
  submit: vi.fn(),
  keyDown: vi.fn(),
  keyUp: vi.fn(),
  mouseOver: vi.fn(),
  mouseOut: vi.fn(),
  scroll: vi.fn(),
  resize: vi.fn(),
};

/**
 * Mock API responses
 */
export const mockApiResponses = {
  success: (data: unknown) => ({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  }),
  error: (status: number, message: string) => ({
    ok: false,
    status,
    json: () => Promise.resolve({ error: message }),
    text: () => Promise.resolve(JSON.stringify({ error: message })),
  }),
  networkError: () => {
    const error = new Error('Network error');
    error.name = 'TypeError';
    return Promise.reject(error);
  },
};
