/**
 * Simple utility functions for Chromatic testing
 * These functions help ensure UI is ready before taking snapshots
 */

/**
 * Simple delay function to wait for animations
 */
export const waitForAnimations = async (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Wait for element to be visible
 */
export const waitForElement = async (selector: string, timeout = 3000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const element = document.querySelector(selector);
    if (element && element.offsetParent !== null) {
      return element;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Element ${selector} not found within ${timeout}ms`);
};
