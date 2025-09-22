import { defineType, defineField } from 'sanity';

/* Form Configuration Object */
export const formConfiguration = defineType({
  name: 'formConfiguration',
  title: 'Formulier configuratie',
  type: 'object',
  fields: [
    defineField({
      name: 'emailTo',
      title: 'Email naar',
      type: 'string',
      description: 'Email adres om formulier inzendingen naar te sturen',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'emailSubject',
      title: 'Email onderwerp template',
      type: 'string',
      description:
        'Onderwerp regel template voor formulier inzending emails. Gebruik {subject} om het ingezonden onderwerp te includeren.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'submitLabel',
      title: 'Verzend knop label',
      type: 'string',
      description: 'Tekst om te tonen op de verzend knop',
      initialValue: 'Verstuur bericht',
    }),
  ],
});
