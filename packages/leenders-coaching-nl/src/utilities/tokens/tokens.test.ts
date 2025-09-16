import { describe, it, expect } from 'vitest';
import {
  pastelVariant,
  sizeTokens,
  getVariantStyles,
  getSizeStyles,
  type PastelVariant,
  type SizeVariant,
} from './index';

describe('Design Tokens', () => {
  describe('pastelVariant', () => {
    it('should contain all expected color variants', () => {
      const expectedVariants: PastelVariant[] = [
        'blue',
        'purple',
        'green',
        'pink',
        'yellow',
        'teal',
      ];

      expectedVariants.forEach((variant) => {
        expect(pastelVariant[variant]).toBeDefined();
        expect(pastelVariant[variant]).toHaveProperty('bg');
        expect(pastelVariant[variant]).toHaveProperty('bgSoft');
        expect(pastelVariant[variant]).toHaveProperty('borderLight');
        expect(pastelVariant[variant]).toHaveProperty('borderDark');
        expect(pastelVariant[variant]).toHaveProperty('textLight');
        expect(pastelVariant[variant]).toHaveProperty('hoverBorderLight');
        expect(pastelVariant[variant]).toHaveProperty('hoverBorderDark');
      });
    });

    it('should have consistent class structure for all variants', () => {
      Object.values(pastelVariant).forEach((variant) => {
        // Check that all properties are strings
        expect(typeof variant.bg).toBe('string');
        expect(typeof variant.bgSoft).toBe('string');
        expect(typeof variant.borderLight).toBe('string');
        expect(typeof variant.borderDark).toBe('string');
        expect(typeof variant.textLight).toBe('string');
        expect(typeof variant.hoverBorderLight).toBe('string');
        expect(typeof variant.hoverBorderDark).toBe('string');

        // Check that classes contain expected patterns
        expect(variant.bg).toMatch(/^bg-pastel-\w+/);
        expect(variant.bgSoft).toMatch(/^bg-pastel-\w+-soft/);
        expect(variant.borderLight).toMatch(/^border-pastel-\w+/);
        expect(variant.borderDark).toMatch(/^border-pastel-\w+-dark/);
        expect(variant.textLight).toMatch(/^text-pastel-\w+-dark/);
      });
    });
  });

  describe('sizeTokens', () => {
    it('should contain all expected size variants', () => {
      const expectedSizes: SizeVariant[] = ['small', 'medium', 'large'];

      expectedSizes.forEach((size) => {
        expect(sizeTokens[size]).toBeDefined();
        expect(sizeTokens[size]).toHaveProperty('padding');
        expect(sizeTokens[size]).toHaveProperty('text');
        expect(sizeTokens[size]).toHaveProperty('icon');
        expect(sizeTokens[size]).toHaveProperty('leading');
      });
    });

    it('should have consistent class structure for all sizes', () => {
      Object.values(sizeTokens).forEach((size) => {
        // Check that all properties are strings
        expect(typeof size.padding).toBe('string');
        expect(typeof size.text).toBe('string');
        expect(typeof size.icon).toBe('string');
        expect(typeof size.leading).toBe('string');

        // Check that classes contain expected patterns
        expect(size.padding).toMatch(/^p-\d+$/);
        expect(size.text).toMatch(/^text-(sm|base|lg)$/);
        expect(size.icon).toMatch(/^h-\d+ w-\d+$/);
        expect(size.leading).toMatch(/^leading-(snug|normal|relaxed)$/);
      });
    });
  });

  describe('getVariantStyles', () => {
    it('should return correct styles for each variant', () => {
      const variants: PastelVariant[] = [
        'blue',
        'purple',
        'green',
        'pink',
        'yellow',
        'teal',
      ];

      variants.forEach((variant) => {
        const styles = getVariantStyles(variant);

        expect(styles).toHaveProperty('background');
        expect(styles).toHaveProperty('border');
        expect(styles).toHaveProperty('text');
        expect(styles).toHaveProperty('hover');

        // Check that returned values match the original tokens
        expect(styles.background).toBe(pastelVariant[variant].bg);
        expect(styles.border).toBe(pastelVariant[variant].borderDark);
        expect(styles.text).toBe(pastelVariant[variant].textLight);
        expect(styles.hover).toBe(pastelVariant[variant].hoverBorderDark);
      });
    });
  });

  describe('getSizeStyles', () => {
    it('should return correct styles for each size', () => {
      const sizes: SizeVariant[] = ['small', 'medium', 'large'];

      sizes.forEach((size) => {
        const styles = getSizeStyles(size);

        expect(styles).toHaveProperty('padding');
        expect(styles).toHaveProperty('text');
        expect(styles).toHaveProperty('icon');
        expect(styles).toHaveProperty('leading');

        // Check that returned values match the original tokens
        expect(styles.padding).toBe(sizeTokens[size].padding);
        expect(styles.text).toBe(sizeTokens[size].text);
        expect(styles.icon).toBe(sizeTokens[size].icon);
        expect(styles.leading).toBe(sizeTokens[size].leading);
      });
    });
  });

  describe('TypeScript types', () => {
    it('should have correct PastelVariant type', () => {
      // This test ensures the type is properly exported and matches the actual keys
      const variant: PastelVariant = 'blue';
      expect(pastelVariant[variant]).toBeDefined();
    });

    it('should have correct SizeVariant type', () => {
      // This test ensures the type is properly exported and matches the actual keys
      const size: SizeVariant = 'medium';
      expect(sizeTokens[size]).toBeDefined();
    });
  });
});
