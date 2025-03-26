import React from 'react';
import type { ComponentProps } from 'react';
import type { SectionCards } from '@/components/sections/SectionCards';
import type { SectionCards as SanitySectionCards } from '@/types/sanity/schema';
import { Card } from '@/components/ui/Card';
import { urlForImage } from '@/utilities/sanity';

/* Type guard for cards section */
const isSanitySectionCards = (
  data: Record<string, unknown>,
): data is SanitySectionCards => {
  return data._type === 'sectionCards' && Array.isArray(data.cards);
};

/**
 * Transform cards section data to component props
 */
export const transformCardsSection = (
  data: Record<string, unknown>,
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
        image={card.image ? urlForImage(card.image).url() : undefined}
        variant={card.variant}
        border
        reverse={card.reverse}
      >
        {card.description && <p>{card.description}</p>}
      </Card>
    )),
  };
};