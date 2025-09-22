import { defineType } from 'sanity';

/* FAQ Item Object */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  description: 'Een vraag en antwoord paar voor de FAQ sectie',
  fields: [
    {
      name: 'question',
      title: 'Vraag',
      type: 'string',
      description: 'De vraag tekst',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Antwoord',
      type: 'richText',
      description: 'De antwoord inhoud met rijke tekst opmaak',
      validation: (Rule) => Rule.required(),
      options: {
        // Override the default styles to only allow normal and h4
        styles: [
          { title: 'Normaal', value: 'normal' },
          { title: 'H4', value: 'h4' },
        ],
      },
    },
  ],
});
