import { defineType } from 'sanity';

export const headerContact = defineType({
  name: 'headerContact',
  title: 'Header contact',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
    },
    {
      name: 'projectEnquiry',
      title: 'Project aanvraag',
      type: 'headerEnquiry',
    },
    {
      name: 'generalEnquiry',
      title: 'Algemene aanvraag',
      type: 'headerEnquiry',
    },
  ],
});
