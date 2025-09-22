import { defineType } from 'sanity';

/* Pricing Card Object */
export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Prijskaart',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beschrijving',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      type: 'string',
      title: 'Prijs',
      description: 'Prijs per sessie (bijv. "€75" of "Gratis")',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'features',
      type: 'array',
      title: 'Functies',
      description: 'Lijst van functies die in dit pakket zijn inbegrepen',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {
              name: 'text',
              type: 'string',
              title: 'Functie tekst',
              validation: (Rule: any) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isPopular',
      type: 'boolean',
      title: 'Is populair pakket',
      description: 'Markeer dit als het meest gekozen pakket',
      initialValue: false,
    },
    {
      name: 'ctaLabel',
      type: 'string',
      title: 'Knoptekst',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Kleurvariant',
      initialValue: 'blue',
    },
  ],
});
