import { defineType } from 'sanity';

/* Card Object */
export const card = defineType({
  name: 'card',
  title: 'Kaart',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titel',
      description: 'De titel van de kaart',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beschrijving',
      description: 'De hoofdininhoud van de kaart',
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Uitgelicht',
      description: 'Of dit een uitgelichte kaart is',
      initialValue: false,
    },
    {
      name: 'date',
      type: 'string',
      title: 'Datum',
      description: 'Optionele datum om te tonen',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categorieën',
      description: 'Optionele categorieën om te tonen',
      of: [{ type: 'string' }],
    },
    {
      name: 'slug',
      type: 'string',
      title: 'Link URL',
      description: 'Optionele URL om naar te linken (bijv. /blog/post-slug)',
    },
    {
      name: 'image',
      title: 'Afbeelding',
      type: 'accessibleImage',
      description: 'Afbeelding voor de kaart',
    },
    {
      name: 'variant',
      type: 'colorVariant',
      title: 'Kleurvariant',
      description: 'Het kleurenthema van de kaart',
      initialValue: 'blue',
    },
    {
      name: 'reverse',
      type: 'boolean',
      title: 'Layout omkeren',
      description: 'Of de afbeelding en inhoud layout omgedraaid moet worden',
      initialValue: false,
    },
    {
      name: 'border',
      type: 'boolean',
      title: 'Rand tonen',
      description: 'Of er een rand om de kaart moet worden getoond',
      initialValue: false,
    },
  ],
});
