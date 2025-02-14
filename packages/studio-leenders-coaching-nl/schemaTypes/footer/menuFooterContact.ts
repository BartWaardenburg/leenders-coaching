import { defineType } from 'sanity';

export const menuFooterContact = defineType({
  name: 'menuFooterContact',
  title: 'Menu Footer Contact',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'projectEnquiry',
      title: 'Project Enquiry',
      type: 'menuFooterEnquiry',
    },
    {
      name: 'generalEnquiry',
      title: 'General Enquiry',
      type: 'menuFooterEnquiry',
    },
  ],
});
