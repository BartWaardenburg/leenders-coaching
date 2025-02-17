import { defineType } from 'sanity';

export const headerContact = defineType({
  name: 'headerContact',
  title: 'Header Contact',
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
      type: 'headerEnquiry',
    },
    {
      name: 'generalEnquiry',
      title: 'General Enquiry',
      type: 'headerEnquiry',
    },
  ],
});
