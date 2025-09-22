import type { FC } from 'react';
import {
  sectionRegistry,
  isSectionType,
  sectionTransformers,
} from '@/utilities/sections/index';

interface SectionRendererProps {
  type: string;
  data: Record<string, unknown>;
  /** Whether this section should have its background variant disabled (for zebra pattern) */
  zebraMode?: boolean;
}

/**
 * Renders a section component based on its type
 * Uses the section registry to map types to components
 * and transforms the data to match component props
 */
export const SectionRenderer: FC<SectionRendererProps> = ({
  type,
  data,
  zebraMode = false,
}) => {
  /* Check if section type exists in registry */
  if (!isSectionType(type)) {
    return null;
  }

  try {
    /* Get the component and transformer */
    const Component = sectionRegistry[type];
    const transform = sectionTransformers[type];

    /* Transform the data and pass it to the component
     * We need to use type assertion here because the transformer output
     * is typed to match the component props, but TypeScript can't verify this statically */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedProps = transform(data) as any;

    /* Apply zebra mode: remove background variant for even sections */
    if (zebraMode && transformedProps.background) {
      transformedProps.background = undefined;
    }

    return <Component {...transformedProps} />;
  } catch (error) {
    /* Log error and return null if transformation fails */
    console.error(`Failed to render section ${type}:`, error);
    return null;
  }
};
