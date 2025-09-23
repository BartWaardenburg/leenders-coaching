import React from 'react';
import { defineType } from 'sanity';
import { baseSectionFields } from './baseFields';
import { SectionPreview } from '../components/SectionPreview';

/* Blog Section */
export const sectionBlog = defineType({
  name: 'sectionBlog',
  title: 'Blog sectie',
  type: 'document',
  description:
    'Een sectie voor het tonen van blogposts in een raster layout met paginering',
  fields: [
    ...baseSectionFields,
    {
      name: 'showAllPosts',
      title: 'Alle blogposts tonen',
      type: 'boolean',
      description:
        'Toon alle beschikbare blogposts in plaats van specifieke selectie',
      initialValue: true,
    },
    {
      name: 'posts',
      title: 'Specifieke blogposts',
      type: 'array',
      description:
        'Selecteer specifieke blogposts om te tonen (alleen gebruikt als "Alle blogposts tonen" uitstaat)',
      hidden: ({ parent }) => parent?.showAllPosts,
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
    {
      name: 'postsPerPage',
      title: 'Posts per pagina',
      type: 'number',
      description: 'Aantal posts om per pagina te tonen',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
    },
    {
      name: 'showFeaturedOnly',
      title: 'Alleen uitgelichte posts tonen',
      type: 'boolean',
      description:
        'Toon alleen posts die als uitgelicht zijn gemarkeerd (alleen gebruikt als "Alle blogposts tonen" aanstaat)',
      hidden: ({ parent }) => !parent?.showAllPosts,
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: 'Sorteervolgorde',
      type: 'string',
      description: 'Hoe de getoonde posts te sorteren',
      options: {
        list: [
          { title: 'Nieuwste eerst', value: 'newest' },
          { title: 'Oudste eerst', value: 'oldest' },
        ],
      },
      initialValue: 'newest',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      background: 'background',
    },
    prepare({ title, subtitle, background }) {
      return {
        title: title || 'Blog sectie',
        subtitle: subtitle,
        media: <SectionPreview variant={background} title="Blog sectie" />,
      };
    },
  },
});
