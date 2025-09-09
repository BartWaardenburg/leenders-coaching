import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import React from 'react';

/**
 * Make React available globally for JSX transforms in test environments.
 */
(globalThis as { React: typeof React }).React = React;

/**
 * Also make React available on the window object for jsdom environments.
 */
if (typeof window !== 'undefined') {
  (window as { React: typeof React }).React = React;
}

/**
 * Extend Vitest's expect method with custom matchers from @testing-library/jest-dom.
 */
expect.extend(matchers);

/**
 * Cleanup the DOM after each test case to prevent test pollution.
 */
afterEach(() => {
  cleanup();
});
