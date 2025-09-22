import { defineType } from 'sanity';

/* Testimonial Object */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Getuigenis',
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'text',
      title: 'Citaat',
      description: 'De getuigenis tekst',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Auteur naam',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      title: 'Auteur rol/titel',
      description: 'Optionele rol of beschrijving van de persoon',
    },
    {
      name: 'image',
      title: 'Profielafbeelding',
      type: 'accessibleImage',
      description:
        'Profielfoto van de persoon die de getuigenis geeft (optioneel)',
    },
  ],
});
