import React from 'react';

/**
 * Color mapping for section preview backgrounds
 * Uses the dark variant colors from the web project for consistent styling
 */
const COLOR_MAP = {
  blue: '#1a2b42',
  purple: '#2b1a42',
  green: '#1a421a',
  pink: '#421a2b',
  yellow: '#422b1a',
  teal: '#1a4242',
} as const;

/**
 * Light/soft color mapping for the indicator circles
 * Uses the soft variant colors from the web project for subtle contrast
 */
const SOFT_COLOR_MAP = {
  blue: '#f7f9fc',
  purple: '#fbf5ff',
  green: '#f7fff7',
  pink: '#fff7fb',
  yellow: '#fffcf7',
  teal: '#f0fffe',
} as const;

export type ColorVariant = keyof typeof COLOR_MAP;

/**
 * Props for the SectionPreview component
 */
interface SectionPreviewProps {
  variant?: ColorVariant;
  title?: string;
}

/**
 * Custom preview component that renders a colored rectangle based on the section's background variant
 * This provides visual consistency between the Sanity Studio and the actual rendered sections
 *
 * @param variant - The color variant to display (blue, purple, green, pink, yellow, teal)
 * @param title - Optional title for accessibility
 * @returns React component with colored background
 */
export const SectionPreview: React.FC<SectionPreviewProps> = ({
  variant,
  title,
}): React.JSX.Element => {
  const backgroundColor =
    variant && COLOR_MAP[variant] ? COLOR_MAP[variant] : 'transparent';

  const indicatorColor =
    variant && SOFT_COLOR_MAP[variant]
      ? SOFT_COLOR_MAP[variant]
      : 'rgba(0, 0, 0, 0.1)';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        minHeight: '60px',
        position: 'relative',
      }}
      title={title}
    >
      {/* Soft color indicator circle */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20px',
          height: '20px',
          backgroundColor: indicatorColor,
          borderRadius: '50%',
        }}
      />
    </div>
  );
};
