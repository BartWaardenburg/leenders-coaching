import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { expect } from 'vitest';

/**
 * Utility function to wait for all animations to complete
 * This ensures Chromatic takes snapshots after the UI is ready
 */
export const waitForAnimationsToComplete = async (timeout = 5000) => {
  return waitFor(
    () => {
      // Check for any elements with animation-related data attributes
      const animatedElements = document.querySelectorAll('[data-animation]');

      // Ensure all animations are marked as complete
      animatedElements.forEach((element) => {
        expect(element).toHaveAttribute('data-animation', 'complete');
      });
    },
    { timeout }
  );
};

/**
 * Utility function to wait for specific elements to be visible
 * Use this when you need to ensure certain UI elements are rendered
 */
export const waitForElementToBeVisible = async (
  selector: string,
  timeout = 3000
) => {
  return waitFor(
    () => {
      const element = document.querySelector(selector);
      expect(element).toBeInTheDocument();
      expect(element).toBeVisible();
    },
    { timeout }
  );
};

/**
 * Utility function to wait for text content to be present
 * Useful for ensuring dynamic content has loaded
 */
export const waitForTextContent = async (text: string, timeout = 3000) => {
  return waitFor(
    () => {
      const element = document.querySelector(`*:contains("${text}")`);
      expect(element).toBeInTheDocument();
    },
    { timeout }
  );
};

/**
 * Utility function to wait for multiple conditions to be met
 * Useful for complex components with multiple async operations
 */
export const waitForMultipleConditions = async (
  conditions: (() => void)[],
  timeout = 5000
) => {
  return waitFor(
    () => {
      conditions.forEach((condition) => condition());
    },
    { timeout }
  );
};

/**
 * Utility function to wait for CSS animations to complete
 * Checks for elements with specific animation classes or states
 */
export const waitForCSSAnimations = async (
  animationSelector = '[class*="animate-"], [class*="transition-"]',
  timeout = 3000
) => {
  return waitFor(
    () => {
      const animatedElements = document.querySelectorAll(animationSelector);

      // Check if any elements are still animating
      const stillAnimating = Array.from(animatedElements).some((element) => {
        const computedStyle = window.getComputedStyle(element);
        return (
          computedStyle.animationPlayState === 'running' ||
          computedStyle.transitionProperty !== 'none'
        );
      });

      expect(stillAnimating).toBe(false);
    },
    { timeout }
  );
};
