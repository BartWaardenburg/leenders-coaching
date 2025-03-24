import React from 'react';
import type { ComponentProps } from 'react';
import type { SectionCards } from '@/components/sections/SectionCards';
import type { PastelColor } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

/* Card variant type */
type CardVariant = 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';

/* Sanity card data type */
interface SanityCard {
  _key: string;
  title: string;
  featured?: boolean;
  date?: string;
  categories?: string[];
  slug?: string;
  image?: {
    url: string;
    alt?: string;
  };
  variant?: CardVariant;
  reverse?: boolean;
}

/* Sanity data type */
export interface SanityCardsSection extends Record<string, unknown> {
  _type: 'sectionCards';
  title?: string;
  displayTitle?: string;
  description?: string;
  cards?: SanityCard[];
  background?: PastelColor;
  border?: boolean;
}

/* Type guard for cards section */
const isSanityCardsSection = (data: Record<string, unknown>): data is SanityCardsSection => {
  return data._type === 'sectionCards';
};

/**
 * Transform cards section data to component props
 */
export const transformCardsSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionCards> => {
  if (!isSanityCardsSection(data)) {
    throw new Error('Invalid cards section data');
  }

  return {
    title: data.displayTitle || undefined,
    description: data.description,
    background: data.background,
    border: data.border,
    children: Array.isArray(data.cards) && data.cards.length > 0
      ? data.cards.map((card) => (
        <Card
          key={card._key}
          featured={card.featured}
          title={card.title}
          date={card.date}
          categories={card.categories}
          slug={card.slug}
          image={card.image?.url}
          variant={card.variant}
          border
          reverse={card.reverse}
        />
      ))
      : null,
  };
};