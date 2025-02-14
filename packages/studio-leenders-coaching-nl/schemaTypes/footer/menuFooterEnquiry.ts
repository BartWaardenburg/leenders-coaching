import { defineType } from 'sanity';

export const menuFooterEnquiry = defineType({
  name: 'menuFooterEnquiry',
  title: 'Menu Footer Enquiry',
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
