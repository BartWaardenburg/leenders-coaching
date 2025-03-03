import { nanoid } from 'nanoid';
import { config } from 'dotenv';
import { uploadImageFromUrl } from './assets.js';
import {
  HeaderSection,
  ContentSection,
  CardsSection,
  TestimonialSection,
  FeaturedSection,
  FormSection,
  FAQSection,
  TimelineSection,
  BlogSection,
} from './section-types.js';
import { isDryRun } from './index.js';

// Load environment variables
config();

/**
 * Create a section with the given data
 * @param data - The section data
 * @returns The section data with a unique key
 */
const createSection = <T extends { _type: string; title: string }>(
  data: T,
): T => {
  return {
    ...data,
    _key: nanoid(),
  };
};

/**
 * Create a header section with the given options
 * @param options - Options for creating the header section
 */
export const createHeaderSection = async ({
  title = 'Hero Section',
  displayTitle,
  description,
  imageUrl,
  background = 'blue',
  cta,
}: {
  title?: string;
  displayTitle: string;
  description?: string;
  imageUrl?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  cta?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
}): Promise<HeaderSection> => {
  let headerImage;

  if (imageUrl) {
    if (isDryRun) {
      console.log(
        `🔍 DRY RUN MODE: Would upload header image from ${imageUrl}`,
      );
    } else {
      headerImage = await uploadImageFromUrl(imageUrl);
    }
  }

  return createSection<HeaderSection>({
    _type: 'sectionHeader',
    title,
    displayTitle,
    description,
    background,
    image: headerImage,
    cta: cta
      ? {
          _type: 'callToAction',
          ...cta,
        }
      : undefined,
  });
};

/**
 * Create a content section with the given options
 * @param options - Options for creating the content section
 */
export const createContentSection = ({
  title,
  displayTitle,
  content,
  background = 'blue',
}: {
  title: string;
  displayTitle?: string;
  content: string[] | Array<any>; // Can be array of strings or Portable Text blocks
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
}): ContentSection => {
  // If content is array of strings, convert to Portable Text blocks
  const blockContent =
    Array.isArray(content) && typeof content[0] === 'string'
      ? content.map((text) => createTextBlock(text))
      : content;

  return createSection<ContentSection>({
    _type: 'sectionContent',
    title,
    displayTitle,
    background,
    content: blockContent,
  });
};

/**
 * Create a testimonial section with the given options
 * @param options - Options for creating the testimonial section
 */
export const createTestimonialSection = ({
  title = 'Testimonials',
  displayTitle = 'Wat cliënten zeggen',
  background = 'pink',
  testimonials,
}: {
  title?: string;
  displayTitle?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  testimonials: Array<{
    quote: string;
    author: string;
    role?: string;
  }>;
}): TestimonialSection => {
  return createSection<TestimonialSection>({
    _type: 'sectionTestimonial',
    title,
    displayTitle,
    background,
    testimonials: testimonials.map((testimonial) => ({
      _key: nanoid(6),
      _type: 'testimonial',
      ...testimonial,
    })),
  });
};

/**
 * Create a cards section with the given options
 * @param options - Options for creating the cards section
 */
export const createCardsSection = ({
  title,
  displayTitle,
  background = 'green',
  cards,
}: {
  title: string;
  displayTitle?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  cards: Array<{
    title: string;
    description?: string;
    link?: {
      text: string;
      url: string;
      isExternal?: boolean;
    };
  }>;
}): CardsSection => {
  return createSection<CardsSection>({
    _type: 'sectionCards',
    title,
    displayTitle,
    background,
    cards: cards.map((card) => ({
      _key: nanoid(6),
      _type: 'card',
      ...card,
    })),
  });
};

/**
 * Create a featured section with the given options
 * @param options - Options for creating the featured section
 */
export const createFeaturedSection = ({
  title,
  displayTitle,
  headline,
  description,
  background = 'purple',
  features,
  cta,
}: {
  title: string;
  displayTitle?: string;
  headline?: string;
  description?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  features: Array<{
    title: string;
    description?: string;
  }>;
  cta?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
}): FeaturedSection => {
  return createSection<FeaturedSection>({
    _type: 'sectionFeatured',
    title,
    displayTitle,
    headline,
    description,
    background,
    features: features.map((feature) => ({
      _key: nanoid(6),
      _type: 'featureItem',
      ...feature,
    })),
    cta: cta
      ? {
          _type: 'callToAction',
          ...cta,
        }
      : undefined,
  });
};

/**
 * Create a form section with the given options
 * @param options - Options for creating the form section
 */
export const createFormSection = ({
  title = 'Contact Formulier',
  displayTitle = 'Neem contact op',
  description,
  background = 'yellow',
  fields = [],
  submitLabel = 'Versturen',
  successMessage = 'Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.',
  errorMessage = 'Er is iets misgegaan. Probeer het later opnieuw.',
}: {
  title?: string;
  displayTitle?: string;
  description?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  fields?: Array<{
    name: string;
    label: string;
    type:
      | 'text'
      | 'email'
      | 'tel'
      | 'textarea'
      | 'select'
      | 'radio'
      | 'checkbox';
    required?: boolean;
    placeholder?: string;
    options?: Array<{
      label: string;
      value: string;
    }>;
  }>;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}): FormSection => {
  return createSection<FormSection>({
    _type: 'sectionForm',
    title,
    displayTitle,
    description,
    background,
    form: {
      _type: 'formConfiguration',
      fields: fields.map((field) => ({
        _key: nanoid(6),
        _type: 'formField',
        ...field,
        options: field.options?.map((option) => ({
          _key: nanoid(6),
          _type: 'formFieldOption',
          ...option,
        })),
      })),
      submitLabel,
      successMessage,
      errorMessage,
    },
  });
};

/**
 * Create a FAQ section with the given options
 * @param options - Options for creating the FAQ section
 */
export const createFAQSection = ({
  title = 'Veelgestelde vragen',
  displayTitle = 'Veelgestelde vragen',
  description,
  background = 'teal',
  items,
}: {
  title?: string;
  displayTitle?: string;
  description?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  items: Array<{
    question: string;
    answer: string;
  }>;
}): FAQSection => {
  return createSection<FAQSection>({
    _type: 'sectionFAQ',
    title,
    displayTitle,
    description,
    background,
    items: items.map((item) => ({
      _key: nanoid(6),
      _type: 'faqItem',
      ...item,
    })),
  });
};

/**
 * Create a timeline section with the given options
 * @param options - Options for creating the timeline section
 */
export const createTimelineSection = ({
  title,
  displayTitle,
  description,
  background = 'blue',
  events,
}: {
  title: string;
  displayTitle?: string;
  description?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  events: Array<{
    title: string;
    description?: string;
    date?: string;
  }>;
}): TimelineSection => {
  return createSection<TimelineSection>({
    _type: 'sectionTimeline',
    title,
    displayTitle,
    description,
    background,
    events: events.map((event) => ({
      _key: nanoid(6),
      _type: 'timelineEvent',
      ...event,
    })),
  });
};

/**
 * Create a blog section with the given options
 * @param options - Options for creating the blog section
 */
export const createBlogSection = ({
  title = 'Blog',
  displayTitle = 'Laatste blog posts',
  description,
  background = 'green',
  postsToShow = 3,
  showFeaturedOnly = false,
  cta,
}: {
  title?: string;
  displayTitle?: string;
  description?: string;
  background?: 'blue' | 'purple' | 'green' | 'pink' | 'yellow' | 'teal';
  postsToShow?: number;
  showFeaturedOnly?: boolean;
  cta?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
}): BlogSection => {
  return createSection<BlogSection>({
    _type: 'sectionBlog',
    title,
    displayTitle,
    description,
    background,
    postsToShow,
    showFeaturedOnly,
    cta: cta
      ? {
          _type: 'callToAction',
          ...cta,
        }
      : undefined,
  });
};

/**
 * Create a text block for Portable Text
 * @param text - The text content
 * @param style - The block style (default: 'normal')
 * @param listItem - The list item type
 * @param level - The level (for headings)
 * @returns A Portable Text block
 */
export const createTextBlock = (
  text: string,
  style: string = 'normal',
  listItem?: string,
  level?: number,
) => {
  return {
    _type: 'block',
    style,
    ...(listItem ? { listItem } : {}),
    ...(level ? { level } : {}),
    children: [
      {
        _type: 'span',
        text,
      },
    ],
    markDefs: [],
  };
};
