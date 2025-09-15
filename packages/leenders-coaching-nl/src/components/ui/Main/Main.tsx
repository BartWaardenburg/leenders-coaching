import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utilities/cn';
import { Flex } from '@/components/ui/Flex';

type MainProps = {
  /** Test identifier for testing purposes */
  testid?: string;
} & ComponentPropsWithoutRef<'main'>;

/**
 * Main content component with animation and consistent styling
 *
 * @param props - The component props
 * @param props.children - Child elements to render within the main section
 * @param props.testid - Test identifier for testing purposes
 * @returns A main element with consistent styling and layout
 */
export const Main = ({ children, className, testid, ...props }: MainProps) => {
  return (
    <Flex
      as="main"
      direction="column"
      className={cn('flex-grow pt-[var(--header-h,125px)]', className)}
      data-testid={testid}
      {...props}
    >
      {children}
    </Flex>
  );
};
