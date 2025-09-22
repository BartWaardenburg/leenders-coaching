import { defineType } from 'sanity';

export const headerEnquiry = defineType({
  name: 'headerEnquiry',
  title: 'Header aanvraag',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'href',
      title: 'Link',
      type: 'string',
    },
    {
      name: 'linkText',
      title: 'Link tekst',
      type: 'string',
    },
  ],
});
