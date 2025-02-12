import type { StructureBuilder } from 'sanity/structure';

/* Define singleton document types */
const singletons = [
  'navigation',
  'footer',
  'menuFooter',
  'siteSettings',
  'homePage',
  'aboutPage',
  'coachingPage',
  'approachPage',
  'blogPage',
  'contactPage',
  'post',
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
];

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      /* Main Pages Section */
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
                  S.document().schemaType('homePage').documentId('homePage'),
                ),
              S.listItem()
                .title('Over Mij')
                .id('aboutPage')
                .child(
                  S.document().schemaType('aboutPage').documentId('aboutPage'),
                ),
              S.listItem()
                .title('Coaching')
                .id('coachingPage')
                .child(
                  S.document()
                    .schemaType('coachingPage')
                    .documentId('coachingPage'),
                ),
              S.listItem()
                .title('Aanpak')
                .id('approachPage')
                .child(
                  S.document()
                    .schemaType('approachPage')
                    .documentId('approachPage'),
                ),
              S.listItem()
                .title('Blog')
                .id('blogPage')
                .child(
                  S.document().schemaType('blogPage').documentId('blogPage'),
                ),
              S.listItem()
                .title('Contact')
                .id('contactPage')
                .child(
                  S.document()
                    .schemaType('contactPage')
                    .documentId('contactPage'),
                ),
            ]),
        ),

      /* Sections */
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
            ]),
        ),

      /* Blog & Content Section */
      S.listItem()
        .title('Blog & Content')
        .child(
          S.list()
            .title('Blog & Content')
            .items([
              S.documentTypeListItem('post').title('Blog Posts'),
              // Add more content types here as needed
            ]),
        ),

      /* Navigation & Menus Section */
      S.listItem()
        .title('Navigation & Menus')
        .child(
          S.list()
            .title('Navigation & Menus')
            .items([
              S.listItem()
                .title('Main Navigation')
                .id('navigation')
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation'),
                ),
              S.listItem()
                .title('Footer')
                .id('footer')
                .child(S.document().schemaType('footer').documentId('footer')),
              S.listItem()
                .title('Menu Footer')
                .id('menuFooter')
                .child(
                  S.document()
                    .schemaType('menuFooter')
                    .documentId('menuFooter'),
                ),
            ]),
        ),

      /* Settings Section */
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Site Settings')
                .id('siteSettings')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings'),
                ),
              // Add more settings here as needed
            ]),
        ),

      /* Filter out singletons from remaining types */
      ...S.documentTypeListItems().filter(
        (listItem) => !singletons.includes(listItem.getId() as string),
      ),
    ]);
