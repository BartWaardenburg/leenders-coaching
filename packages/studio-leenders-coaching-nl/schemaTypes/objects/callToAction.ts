import { defineType } from 'sanity';

/* Call to Action Object */
export const callToAction = defineType({
  name: 'callToAction',
  title: 'Actieknop',
  type: 'object',
  fields: [
    {
      name: 'label',
      type: 'string',
      title: 'Knoptekst',
    },
    {
      name: 'href',
      type: 'string',
      title: 'Knoplink',
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Knopvariant',
      options: {
        list: [
          { title: 'Zwart', value: 'black' },
          { title: 'Transparant', value: 'transparent' },
          { title: 'Blauw', value: 'blue' },
          { title: 'Paars', value: 'purple' },
          { title: 'Groen', value: 'green' },
          { title: 'Roze', value: 'pink' },
          { title: 'Geel', value: 'yellow' },
          { title: 'Turquoise', value: 'teal' },
        ],
      },
      initialValue: 'black',
    },
    {
      name: 'isExternal',
      type: 'boolean',
      title: 'In nieuw tabblad openen',
      description: 'Indien aangevinkt, opent de link in een nieuw tabblad',
      initialValue: false,
    },
  ],
});
