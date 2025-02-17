import { defineType } from 'sanity';

export const headerEnquiry = defineType({
  name: 'headerEnquiry',
  title: 'Header Enquiry',
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
      title: 'Link Text',
      type: 'string',
    },
  ],
});
