/**
 * Simple utility functions for Chromatic testing
 * These functions help ensure UI is ready before taking snapshots
 */

/**
 * Simple delay function to wait for animations
 * Currently disabled for testing - resolves immediately
 */
export const waitForAnimations = async (_ms = 300) => {
  return Promise.resolve();
};

/**
 * Wait for element to be visible
 * Currently disabled for testing - returns null immediately
 */
export const waitForElement = async (_selector: string, _timeout = 3000) => {
  return Promise.resolve(null);
};
