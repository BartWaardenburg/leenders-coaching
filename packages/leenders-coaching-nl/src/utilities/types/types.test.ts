import { describe, it, expect } from 'vitest';
import type {
  PolymorphicProps,
  BaseComponentProps,
  SizeVariant,
  ColorVariant,
  MaxWidthVariant,
  TextAlignVariant,
  FlexDirectionVariant,
  FlexWrapVariant,
  JustifyContentVariant,
  AlignItemsVariant,
  GapVariant,
  SpaceVariant,
} from './types';

describe('Shared Types', () => {
  describe('PolymorphicProps', () => {
    it('should allow polymorphic component props', () => {
      type TestProps = PolymorphicProps<
        'div',
        { customProp: string } & BaseComponentProps
      >;

      // This should compile without errors
      const testProps: TestProps = {
        as: 'div',
        customProp: 'test',
        className: 'test-class',
        testid: 'test-id',
      };

      expect(testProps.as).toBe('div');
      expect(testProps.customProp).toBe('test');
      expect(testProps.className).toBe('test-class');
      expect(testProps.testid).toBe('test-id');
    });
  });

  describe('BaseComponentProps', () => {
    it('should include common component props', () => {
      const baseProps: BaseComponentProps = {
        testid: 'test-component',
        className: 'test-class',
      };

      expect(baseProps.testid).toBe('test-component');
      expect(baseProps.className).toBe('test-class');
    });
  });

  describe('Variant Types', () => {
    it('should have correct size variants', () => {
      const sizes: SizeVariant[] = [
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
      ];
      expect(sizes).toHaveLength(8);
    });

    it('should have correct color variants', () => {
      const colors: ColorVariant[] = [
        'default',
        'muted',
        'foreground',
        'primary',
        'secondary',
        'destructive',
      ];
      expect(colors).toHaveLength(6);
    });

    it('should have correct max width variants', () => {
      const maxWidths: MaxWidthVariant[] = [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
        'full',
      ];
      expect(maxWidths).toHaveLength(12);
    });

    it('should have correct text align variants', () => {
      const textAligns: TextAlignVariant[] = ['left', 'center', 'right'];
      expect(textAligns).toHaveLength(3);
    });

    it('should have correct flex direction variants', () => {
      const directions: FlexDirectionVariant[] = [
        'row',
        'row-reverse',
        'column',
        'column-reverse',
      ];
      expect(directions).toHaveLength(4);
    });

    it('should have correct flex wrap variants', () => {
      const wraps: FlexWrapVariant[] = ['nowrap', 'wrap', 'wrap-reverse'];
      expect(wraps).toHaveLength(3);
    });

    it('should have correct justify content variants', () => {
      const justify: JustifyContentVariant[] = [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
      ];
      expect(justify).toHaveLength(6);
    });

    it('should have correct align items variants', () => {
      const align: AlignItemsVariant[] = [
        'start',
        'end',
        'center',
        'baseline',
        'stretch',
      ];
      expect(align).toHaveLength(5);
    });

    it('should have correct gap variants', () => {
      const gaps: GapVariant[] = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20,
      ];
      expect(gaps).toHaveLength(16);
    });

    it('should have correct space variants', () => {
      const spaces: SpaceVariant[] = [0, 1, 2, 3, 4, 'px'];
      expect(spaces).toHaveLength(6);
    });
  });
});
