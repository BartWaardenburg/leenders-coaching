import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Stack } from '@/components/ui/Stack';

type InputProps = {
  label?: string;
  error?: string;
  className?: string;
  as?: 'input' | 'textarea';
  variant?: 'default' | 'bordered';
  disabled?: boolean;
} & (ComponentPropsWithoutRef<'input'> | ComponentPropsWithoutRef<'textarea'>);

/**
 * A minimal input component with sharp, modern styling
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    { label, error, className, as, variant = 'default', disabled, ...props },
    ref
  ) => {
    const id = useId();
    const baseInputStyles = twMerge(
      'w-full px-4 py-2',
      'transition-all duration-200',
      'focus:outline-none',
      'placeholder:text-muted-foreground dark:placeholder:text-muted-foreground/60',
      'text-foreground dark:text-foreground',
      variant === 'default' &&
        [
          'bg-background border-b-2 border-foreground/20',
          'focus:border-foreground dark:focus:border-foreground',
          'hover:border-foreground/40 dark:hover:border-foreground/40',
          'disabled:bg-muted disabled:border-muted-foreground/40 disabled:text-muted-foreground disabled:cursor-not-allowed',
        ].join(' '),
      variant === 'bordered' &&
        [
          'bg-background border border-foreground/20',
          'focus:border-foreground dark:focus:border-foreground',
          'hover:border-foreground/40 dark:hover:border-foreground/40',
          'disabled:bg-muted disabled:border-muted-foreground/40 disabled:text-muted-foreground disabled:cursor-not-allowed',
        ].join(' '),
      error && '!border-destructive dark:!border-destructive',
      className
    );

    return (
      <Stack space={3}>
        <Box className="group">
          {label && (
            <Box className="relative inline-block">
              <label
                htmlFor={id}
                className={twMerge(
                  'block text-sm font-medium mb-1',
                  disabled ? 'opacity-60' : undefined
                )}
              >
                {label}
              </label>
              <Box
                className={twMerge(
                  'absolute -bottom-[2px] left-0 h-[2px] w-0 bg-primary/60 dark:bg-primary/40',
                  'transition-all duration-300 ease-out group-focus-within:w-12',
                  disabled && 'hidden'
                )}
              />
            </Box>
          )}
          <Box className="mt-3">
            {as === 'textarea' ? (
              <textarea
                id={id}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                disabled={disabled}
                className={twMerge(
                  baseInputStyles,
                  'min-h-[120px] resize-y',
                  variant === 'default' && 'border-x-0 border-t-0',
                  className
                )}
                {...(props as ComponentPropsWithoutRef<'textarea'>)}
              />
            ) : (
              <input
                id={id}
                ref={ref as React.Ref<HTMLInputElement>}
                disabled={disabled}
                className={twMerge(baseInputStyles, className)}
                {...(props as ComponentPropsWithoutRef<'input'>)}
              />
            )}
          </Box>
        </Box>
        {error && (
          <Text variant="error" className={disabled ? 'opacity-60' : undefined}>
            {error}
          </Text>
        )}
      </Stack>
    );
  }
);

Input.displayName = 'Input';
