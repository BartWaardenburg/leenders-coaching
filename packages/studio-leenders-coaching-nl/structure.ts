import type { StructureBuilder } from 'sanity/structure';
import {
  CogIcon,
  DocumentIcon,
  EditIcon,
  EyeOpenIcon,
  HomeIcon,
} from '@sanity/icons';
import { BlogPostsView } from './src/views/BlogPostsView';
import { DashboardView } from './src/views/DashboardView';

/* Define singleton document types. */
const singletons = [
  'header',
  'footer',
  'homePage',
  'aboutPage',
  'coachingPage',
  'approachPage',
  'blogPage',
  'contactPage',
  'post',
  'category',
  'sectionHeader',
  'sectionBlog',
  'sectionPricing',
  'sectionFAQ',
  'sectionTimeline',
  'sectionCalendar',
  'sectionFeatured',
  'sectionForm',
  'sectionContent',
  'sectionCards',
  'sectionTestimonial',
  'configuration',
];

/**
 * Define the studio structure for organizing content.
 * @param S - The Sanity structure builder instance.
 * @returns The structured content organization for the studio.
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      /* Dashboard. */
      S.listItem()
        .title('Dashboard')
        .icon(HomeIcon)
        .child(S.component().component(DashboardView).title('Dashboard')),
      /* Main Pages Section. */
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .id('homePage')
                .child(
                  S.document().schemaType('homePage').documentId('homePage')
                ),
              S.listItem()
                .title('Over Mij')
                .id('aboutPage')
                .child(
                  S.document().schemaType('aboutPage').documentId('aboutPage')
                ),
              S.listItem()
                .title('Coaching')
                .id('coachingPage')
                .child(
                  S.document()
                    .schemaType('coachingPage')
                    .documentId('coachingPage')
                ),
              S.listItem()
                .title('Aanpak')
                .id('approachPage')
                .child(
                  S.document()
                    .schemaType('approachPage')
                    .documentId('approachPage')
                ),
              S.listItem()
                .title('Blog')
                .id('blogPage')
                .child(
                  S.document()
                    .schemaType('blogPage')
                    .documentId('blogPage')
                    .title('Blog Page')
                ),
              S.listItem()
                .title('Contact')
                .id('contactPage')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage')
                ),
            ])
        ),

      /* Sections. */
      S.listItem()
        .title('Sections')
        .child(
          S.list()
            .title('Sections')
            .items([
              S.listItem()
                .title('Header Sections')
                .child(S.documentTypeList('sectionHeader')),
              S.listItem()
                .title('Blog Sections')
                .child(S.documentTypeList('sectionBlog')),
              S.listItem()
                .title('Pricing Sections')
                .child(S.documentTypeList('sectionPricing')),
              S.listItem()
                .title('FAQ Sections')
                .child(S.documentTypeList('sectionFAQ')),
              S.listItem()
                .title('Timeline Sections')
                .child(S.documentTypeList('sectionTimeline')),
              S.listItem()
                .title('Calendar Sections')
                .child(S.documentTypeList('sectionCalendar')),
              S.listItem()
                .title('Featured Sections')
                .child(S.documentTypeList('sectionFeatured')),
              S.listItem()
                .title('Form Sections')
                .child(S.documentTypeList('sectionForm')),
              S.listItem()
                .title('Content Sections')
                .child(S.documentTypeList('sectionContent')),
              S.listItem()
                .title('Cards Sections')
                .child(S.documentTypeList('sectionCards')),
              S.listItem()
                .title('Testimonial Sections')
                .child(S.documentTypeList('sectionTestimonial')),
            ])
        ),

      /* Blog & Content Section. */
      S.listItem()
        .title('Blog & Content')
        .child(
          S.list()
            .title('Blog & Content')
            .items([
              S.listItem()
                .title('Blog Posts')
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList('post')
                    .title('Blog Posts')
                    .child((id) =>
                      S.document()
                        .schemaType('post')
                        .documentId(id)
                        .views([
                          S.view.form().icon(EditIcon),
                          S.view
                            .component(BlogPostsView)
                            .title('Overview')
                            .icon(EyeOpenIcon),
                        ])
                    )
                ),
              S.listItem()
                .title('Categories')
                .icon(DocumentIcon)
                .child(S.documentTypeList('category').title('Categories')),
            ])
        ),

      /* Navigation & Layout Section. */
      S.listItem()
        .title('Navigation & Layout')
        .child(
          S.list()
            .title('Navigation & Layout')
            .items([
              S.listItem()
                .title('Header')
                .id('header')
                .child(S.document().schemaType('header').documentId('header')),
              S.listItem()
                .title('Footer')
                .id('footer')
                .child(S.document().schemaType('footer').documentId('footer')),
            ])
        ),

      /* Configuration Section. */
      S.listItem()
        .title('Configuration')
        .id('siteConfiguration')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('configuration')
            .documentId('configuration')
            .title('Site Configuration')
        ),

      /* Filter out singletons from remaining types. */
      ...S.documentTypeListItems().filter(
        (listItem) => !singletons.includes(listItem.getId() as string)
      ),
    ]);
