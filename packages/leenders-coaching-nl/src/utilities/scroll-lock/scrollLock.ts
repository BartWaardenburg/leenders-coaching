/**
 * Shared scroll lock utility to prevent conflicts when multiple components
 * (like Modal and Header menu) try to control body scroll simultaneously.
 * Uses a counter-based approach to ensure proper cleanup.
 */

let locks = 0;

/**
 * Locks body scroll. Safe to call multiple times.
 * Only actually locks when the first lock is applied.
 */
export function lockScroll(): void {
  if (++locks === 1) {
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Unlocks body scroll. Safe to call multiple times.
 * Only actually unlocks when the last lock is removed.
 */
export function unlockScroll(): void {
  if (locks && --locks === 0) {
    document.body.style.overflow = '';
  }
}

/**
 * Gets the current lock count (useful for debugging).
 */
export function getScrollLockCount(): number {
  return locks;
}
