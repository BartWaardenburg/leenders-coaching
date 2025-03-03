import React from 'react';
import type { ComponentProps } from 'react';
import type { SectionCards } from '@/components/sections/SectionCards';
import type { PastelColor } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';

/* Sanity data type */
export interface SanityCardsSection extends Record<string, unknown> {
  _type: 'sectionCards';
  title?: string;
  displayTitle?: string;
  description?: string;
  background?: PastelColor;
  border?: boolean;
  cards: Array<{
    featured?: boolean;
    title: string;
    date?: string;
    categories?: string[];
    slug?: string;
    image?: string;
    variant?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
    reverse?: boolean;
  }>;
}

/**
 * Type guard for cards section
 */
export const isCardsSection = (
  data: Record<string, unknown>,
): data is SanityCardsSection => {
  return data._type === 'sectionCards';
};

/**
 * Transform cards section data to component props
 */
export const transformCardsSection = (
  data: Record<string, unknown>,
): ComponentProps<typeof SectionCards> => {
  if (!isCardsSection(data)) {
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
          key={card.title}
          featured={card.featured}
          title={card.title}
          date={card.date}
          categories={card.categories}
          slug={card.slug}
          image={card.image}
          variant={card.variant}
          border
          reverse={card.reverse}
        />
      ))
      : null,
  };
}; 