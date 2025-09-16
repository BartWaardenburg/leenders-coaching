import React from 'react';
import type { ComponentProps } from 'react';
import type { SectionCards } from '@/components/sections/SectionCards';
import type { SectionCards as SanitySectionCards } from '@/types/sanity/schema';
import { Card } from '@/components/ui/Card';

/**
 * Type guard to check if data is a valid Sanity cards section
 * @param data - The data to check
 * @returns True if data is a valid SanitySectionCards
 */
const isSanitySectionCards = (
  data: Record<string, unknown>
): data is SanitySectionCards => {
  return data._type === 'sectionCards';
};

/**
 * Transform cards section data to component props
 * @param data - The raw section data from Sanity
 * @returns Transformed props for the SectionCards component
 * @throws Error if data is not a valid cards section
 */
export const transformCardsSection = (
  data: Record<string, unknown>
): ComponentProps<typeof SectionCards> => {
  if (!isSanitySectionCards(data)) {
    throw new Error('Invalid cards section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description || '',
    background: data.background,
    border: data.border,
    children: data.cards?.map((card) => (
      <Card
        key={card._key}
        title={card.title || ''}
        featured={card.featured}
        date={card.date}
        categories={card.categories}
        slug={card.slug}
        image={card.image || undefined}
        variant={card.variant}
        border={card.border}
        reverse={card.reverse}
      >
        {card.description && <p>{card.description}</p>}
      </Card>
    )),
  };
};
