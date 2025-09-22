import { Rule } from 'sanity';

/* Base section fields that all sections will share */
export const baseSectionFields = [
  {
    name: 'title',
    title: 'Interne titel',
    type: 'string',
    description: 'Titel voor interne referentie alleen',
    validation: (rule: Rule) => rule.required(),
  },
  {
    name: 'displayTitle',
    title: 'Weergave titel',
    type: 'string',
    description: 'Titel die op de website wordt getoond (optioneel)',
  },
  {
    name: 'description',
    title: 'Beschrijving',
    type: 'string',
    description: 'Beschrijving voor de sectie',
  },
  {
    name: 'background',
    title: 'Achtergrondkleur',
    type: 'colorVariant',
    description: 'Achtergrondkleur voor de sectie',
  },
  {
    name: 'border',
    title: 'Rand tonen',
    type: 'boolean',
    initialValue: false,
    description: 'Of er een rand om de sectie moet worden getoond',
  },
];
