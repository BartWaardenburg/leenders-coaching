import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  describe('basic functionality', () => {
    it('should merge multiple class strings', () => {
      const result = cn('text-red-500', 'bg-blue-100', 'p-4');
      expect(result).toBe('text-red-500 bg-blue-100 p-4');
    });

    it('should handle empty strings', () => {
      const result = cn('text-red-500', '', 'bg-blue-100');
      expect(result).toBe('text-red-500 bg-blue-100');
    });

    it('should handle undefined and null values', () => {
      const result = cn('text-red-500', undefined, null, 'bg-blue-100');
      expect(result).toBe('text-red-500 bg-blue-100');
    });

    it('should handle single class', () => {
      const result = cn('text-red-500');
      expect(result).toBe('text-red-500');
    });

    it('should handle no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('conditional classes', () => {
    it('should handle boolean conditions', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      );
      expect(result).toBe('base-class active-class');
    });

    it('should handle ternary conditions', () => {
      const isActive = true;
      const result = cn(
        'base-class',
        isActive ? 'active-class' : 'inactive-class'
      );
      expect(result).toBe('base-class active-class');
    });

    it('should handle complex conditional logic', () => {
      const variant = 'primary';
      const size = 'large';
      const isDisabled = false;

      const result = cn(
        'base-class',
        variant === 'primary' && 'text-white bg-blue-500',
        size === 'large' && 'px-6 py-3',
        isDisabled && 'opacity-50 cursor-not-allowed'
      );

      expect(result).toBe('base-class text-white bg-blue-500 px-6 py-3');
    });
  });

  describe('Tailwind conflict resolution', () => {
    it('should resolve conflicting padding classes', () => {
      const result = cn('p-2', 'p-4', 'px-6');
      expect(result).toBe('p-4 px-6');
    });

    it('should resolve conflicting margin classes', () => {
      const result = cn('m-2', 'm-4', 'mx-6');
      expect(result).toBe('m-4 mx-6');
    });

    it('should resolve conflicting text color classes', () => {
      const result = cn('text-red-500', 'text-blue-500', 'text-green-500');
      expect(result).toBe('text-green-500');
    });

    it('should resolve conflicting background color classes', () => {
      const result = cn('bg-red-100', 'bg-blue-100', 'bg-green-100');
      expect(result).toBe('bg-green-100');
    });

    it('should resolve conflicting display classes', () => {
      const result = cn('block', 'inline', 'flex');
      expect(result).toBe('flex');
    });

    it('should resolve conflicting position classes', () => {
      const result = cn('static', 'relative', 'absolute');
      expect(result).toBe('absolute');
    });
  });

  describe('object syntax', () => {
    it('should handle object with boolean values', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-100': false,
        'p-4': true,
        'm-2': false,
      });
      expect(result).toBe('text-red-500 p-4');
    });

    it('should handle mixed object and string inputs', () => {
      const result = cn(
        'base-class',
        {
          'text-red-500': true,
          'bg-blue-100': false,
        },
        'additional-class'
      );
      expect(result).toBe('base-class text-red-500 additional-class');
    });

    it('should handle nested object conditions', () => {
      const isActive = true;
      const variant = 'primary' as string;

      const result = cn({
        'base-class': true,
        'active-class': isActive,
        'primary-variant': variant === 'primary',
        'secondary-variant': variant === 'secondary',
      });

      expect(result).toBe('base-class active-class primary-variant');
    });
  });

  describe('array syntax', () => {
    it('should handle array of classes', () => {
      const result = cn(['text-red-500', 'bg-blue-100', 'p-4']);
      expect(result).toBe('text-red-500 bg-blue-100 p-4');
    });

    it('should handle nested arrays', () => {
      const result = cn(['text-red-500', ['bg-blue-100', 'p-4']]);
      expect(result).toBe('text-red-500 bg-blue-100 p-4');
    });

    it('should handle mixed array and string inputs', () => {
      const result = cn(
        'base-class',
        ['text-red-500', 'bg-blue-100'],
        'additional-class'
      );
      expect(result).toBe(
        'base-class text-red-500 bg-blue-100 additional-class'
      );
    });
  });

  describe('complex scenarios', () => {
    it('should handle complex component props', () => {
      const props = {
        className: 'custom-class',
        variant: 'primary' as 'primary' | 'secondary',
        size: 'large' as 'large' | 'small',
        isDisabled: false,
        isActive: true,
      };

      const result = cn(
        'base-button',
        {
          'btn-primary': props.variant === 'primary',
          'btn-secondary': props.variant === 'secondary',
          'btn-large': props.size === 'large',
          'btn-small': props.size === 'small',
          'btn-disabled': props.isDisabled,
          'btn-active': props.isActive,
        },
        props.className
      );

      expect(result).toBe(
        'base-button btn-primary btn-large btn-active custom-class'
      );
    });

    it('should handle responsive classes', () => {
      const result = cn('text-sm', 'md:text-base', 'lg:text-lg', 'xl:text-xl');
      expect(result).toBe('text-sm md:text-base lg:text-lg xl:text-xl');
    });

    it('should handle state classes', () => {
      const isHovered = true;
      const isFocused = false;

      const result = cn(
        'base-input',
        'hover:border-blue-500',
        isHovered && 'hover:shadow-md',
        'focus:ring-2',
        isFocused && 'focus:ring-blue-500'
      );

      expect(result).toBe(
        'base-input hover:border-blue-500 hover:shadow-md focus:ring-2'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle whitespace in class names', () => {
      const result = cn('  text-red-500  ', '  bg-blue-100  ');
      expect(result).toBe('text-red-500 bg-blue-100');
    });

    it('should handle duplicate classes', () => {
      const result = cn('text-red-500', 'text-red-500', 'bg-blue-100');
      expect(result).toBe('text-red-500 bg-blue-100');
    });

    it('should handle mixed valid and invalid classes', () => {
      const result = cn('text-red-500', 'invalid-class', 'bg-blue-100');
      expect(result).toBe('text-red-500 invalid-class bg-blue-100');
    });

    it('should handle very long class lists', () => {
      const classes = Array.from({ length: 100 }, (_, i) => `class-${i}`);
      const result = cn(...classes);
      expect(result).toContain('class-0');
      expect(result).toContain('class-99');
      expect(result.split(' ')).toHaveLength(100);
    });
  });

  describe('integration with clsx and tailwind-merge', () => {
    it('should properly merge conflicting Tailwind classes', () => {
      // This tests that tailwind-merge is working correctly
      const result = cn('p-2 p-4', 'text-red-500 text-blue-500');
      expect(result).toBe('p-4 text-blue-500');
    });

    it('should handle clsx object syntax with Tailwind conflicts', () => {
      const result = cn({
        'p-2': true,
        'p-4': true, // This should override p-2
        'text-red-500': false,
        'text-blue-500': true,
      });
      expect(result).toBe('p-4 text-blue-500');
    });

    it('should handle complex nested conditions with conflicts', () => {
      const isActive = true;
      const variant = 'primary' as string;

      const result = cn(
        'base-class p-2', // p-2 should be overridden
        {
          'active-class p-4': isActive, // p-4 should override p-2
          'primary-variant text-red-500': variant === 'primary',
          'secondary-variant text-blue-500': variant === 'secondary',
        },
        'additional-class'
      );

      expect(result).toBe(
        'base-class active-class p-4 primary-variant text-red-500 additional-class'
      );
    });
  });
});
