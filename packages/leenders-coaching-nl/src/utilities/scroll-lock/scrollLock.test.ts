import { describe, it, expect, beforeEach } from 'vitest';
import { lockScroll, unlockScroll, getScrollLockCount } from './scrollLock';
import { mockDocument } from '@/mocks';

// Mock document for testing
Object.defineProperty(global, 'document', {
  value: mockDocument,
  writable: true,
});

describe('scrollLock utility', () => {
  beforeEach(() => {
    // Reset the lock counter before each test
    // We need to access the internal counter to reset it
    // Since it's not exported, we'll unlock until count is 0
    while (getScrollLockCount() > 0) {
      unlockScroll();
    }

    // Reset document body style
    mockDocument.body.style.overflow = '';
  });

  describe('lockScroll', () => {
    it('should lock scroll on first call', () => {
      lockScroll();

      expect(mockDocument.body.style.overflow).toBe('hidden');
      expect(getScrollLockCount()).toBe(1);
    });

    it('should not change overflow style on subsequent calls', () => {
      lockScroll();
      lockScroll();
      lockScroll();

      expect(mockDocument.body.style.overflow).toBe('hidden');
      expect(getScrollLockCount()).toBe(3);
    });

    it('should increment lock count on each call', () => {
      expect(getScrollLockCount()).toBe(0);

      lockScroll();
      expect(getScrollLockCount()).toBe(1);

      lockScroll();
      expect(getScrollLockCount()).toBe(2);

      lockScroll();
      expect(getScrollLockCount()).toBe(3);
    });
  });

  describe('unlockScroll', () => {
    it('should not change overflow style when no locks exist', () => {
      unlockScroll();

      expect(mockDocument.body.style.overflow).toBe('');
      expect(getScrollLockCount()).toBe(0);
    });

    it('should not unlock until all locks are removed', () => {
      lockScroll();
      lockScroll();
      lockScroll();

      expect(getScrollLockCount()).toBe(3);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      unlockScroll();
      expect(getScrollLockCount()).toBe(2);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      unlockScroll();
      expect(getScrollLockCount()).toBe(1);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });

    it('should handle multiple unlock calls safely', () => {
      lockScroll();
      unlockScroll();
      unlockScroll();
      unlockScroll();

      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });

    it('should decrement lock count on each call', () => {
      lockScroll();
      lockScroll();
      lockScroll();

      expect(getScrollLockCount()).toBe(3);

      unlockScroll();
      expect(getScrollLockCount()).toBe(2);

      unlockScroll();
      expect(getScrollLockCount()).toBe(1);

      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
    });
  });

  describe('getScrollLockCount', () => {
    it('should return 0 initially', () => {
      expect(getScrollLockCount()).toBe(0);
    });

    it('should return correct count after lock operations', () => {
      lockScroll();
      expect(getScrollLockCount()).toBe(1);

      lockScroll();
      expect(getScrollLockCount()).toBe(2);

      unlockScroll();
      expect(getScrollLockCount()).toBe(1);

      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
    });
  });

  describe('integration scenarios', () => {
    it('should handle multiple components locking scroll simultaneously', () => {
      // Simulate Header component locking scroll
      lockScroll();
      expect(getScrollLockCount()).toBe(1);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      // Simulate Modal component also locking scroll
      lockScroll();
      expect(getScrollLockCount()).toBe(2);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      // Header component unlocks
      unlockScroll();
      expect(getScrollLockCount()).toBe(1);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      // Modal component unlocks
      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });

    it('should handle rapid lock/unlock operations', () => {
      // Rapid locking
      for (let i = 0; i < 10; i++) {
        lockScroll();
      }
      expect(getScrollLockCount()).toBe(10);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      // Rapid unlocking
      for (let i = 0; i < 10; i++) {
        unlockScroll();
      }
      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });

    it('should handle mixed lock/unlock operations', () => {
      lockScroll();
      lockScroll();
      unlockScroll();
      lockScroll();
      unlockScroll();
      unlockScroll();
      lockScroll();

      expect(getScrollLockCount()).toBe(1);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle unlock when count is already 0', () => {
      expect(getScrollLockCount()).toBe(0);

      unlockScroll();
      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });

    it('should maintain correct state after complex operations', () => {
      // Complex scenario: multiple components with different timing
      lockScroll(); // Component A locks
      lockScroll(); // Component B locks
      lockScroll(); // Component C locks

      unlockScroll(); // Component A unlocks
      lockScroll(); // Component D locks
      unlockScroll(); // Component B unlocks

      expect(getScrollLockCount()).toBe(2);
      expect(mockDocument.body.style.overflow).toBe('hidden');

      unlockScroll(); // Component C unlocks
      unlockScroll(); // Component D unlocks

      expect(getScrollLockCount()).toBe(0);
      expect(mockDocument.body.style.overflow).toBe('');
    });
  });
});
