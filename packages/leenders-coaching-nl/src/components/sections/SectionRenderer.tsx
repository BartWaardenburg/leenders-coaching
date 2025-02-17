import type { FC } from 'react';
import { sectionRegistry, isSectionType, sectionTransformers } from '@/utilities/sections/index';

interface SectionRendererProps {
  type: string;
  data: Record<string, unknown>;
}

/**
 * Renders a section component based on its type
 * Uses the section registry to map types to components
 * and transforms the data to match component props
 */
export const SectionRenderer: FC<SectionRendererProps> = ({ type, data }) => {
  // Check if section type exists in registry
  if (!isSectionType(type)) {
    return null;
  }

  try {
    // Get the component and transformer
    const Component = sectionRegistry[type];
    const transform = sectionTransformers[type];

    // Transform the data and render the component
    // We use a type assertion here because we know the transformer returns the correct props
    // for each section type, but TypeScript can't infer this correctly at runtime
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component {...(transform(data) as any)} />;
  } catch (error) {
    // Log error and return null if transformation fails
    console.error(`Failed to render section ${type}:`, error);
    return null;
  }
}; 