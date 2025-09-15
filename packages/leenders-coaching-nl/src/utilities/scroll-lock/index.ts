/**
 * Scroll lock utility exports
 *
 * Provides functions to lock and unlock body scroll with a counter-based approach
 * to handle multiple components trying to control scroll simultaneously.
 */

export { lockScroll, unlockScroll, getScrollLockCount } from './scrollLock';
