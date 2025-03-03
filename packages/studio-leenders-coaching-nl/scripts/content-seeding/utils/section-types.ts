// Since we're using CommonJS, we need to handle types differently
// We'll define the types here and export them via module.exports

/**
 * Import types from index
 */
import { SectionBase } from './index.js';

/**
 * Type for header section
 */
export interface HeaderSection extends SectionBase {
  _type: 'sectionHeader';
  description?: string;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  cta?: {
    _type: 'callToAction';
    label: string;
    url: string;
    isExternal?: boolean;
  };
}

/**
 * Type for content section
 */
export interface ContentSection extends SectionBase {
  _type: 'sectionContent';
  content?: any; // This is a block content field
}

/**
 * Type for cards section
 */
export interface CardsSection extends SectionBase {
  _type: 'sectionCards';
  cards?: Array<{
    _key: string;
    _type: 'card';
    title: string;
    description?: string;
    image?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
    link?: {
      text: string;
      url: string;
      isExternal?: boolean;
    };
    cta?: {
      _type: 'callToAction';
      label: string;
      url: string;
      isExternal?: boolean;
    };
  }>;
}

/**
 * Type for featured section
 */
export interface FeaturedSection extends SectionBase {
  _type: 'sectionFeatured';
  headline?: string;
  description?: string;
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  features?: Array<{
    _key: string;
    _type: 'featureItem';
    title: string;
    description?: string;
  }>;
  cta?: {
    _type: 'callToAction';
    label: string;
    url: string;
    isExternal?: boolean;
  };
}

/**
 * Type for pricing section
 */
export interface PricingSection extends SectionBase {
  _type: 'sectionPricing';
  description?: string;
  pricingCards?: Array<{
    _key: string;
    _type: 'pricingCard';
    title: string;
    price: string;
    description?: string;
    features?: string[];
    cta?: {
      _type: 'callToAction';
      label: string;
      url: string;
      isExternal?: boolean;
    };
    highlight?: boolean;
  }>;
}

/**
 * Type for FAQ section
 */
export interface FAQSection extends SectionBase {
  _type: 'sectionFAQ';
  description?: string;
  items?: Array<{
    _key: string;
    _type: 'faqItem';
    question: string;
    answer: string;
  }>;
}

/**
 * Type for timeline section
 */
export interface TimelineSection extends SectionBase {
  _type: 'sectionTimeline';
  description?: string;
  events?: Array<{
    _key: string;
    _type: 'timelineEvent';
    title: string;
    description?: string;
    date?: string;
  }>;
}

/**
 * Type for testimonial section
 */
export interface TestimonialSection extends SectionBase {
  _type: 'sectionTestimonial';
  testimonials?: Array<{
    _key: string;
    _type: 'testimonial';
    quote: string;
    author: string;
    role?: string;
    image?: {
      _type: 'image';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  }>;
}

/**
 * Type for form section
 */
export interface FormSection extends SectionBase {
  _type: 'sectionForm';
  description?: string;
  form?: {
    _type: 'formConfiguration';
    fields?: Array<{
      _key: string;
      _type: 'formField';
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
        _key: string;
        _type: 'formFieldOption';
        label: string;
        value: string;
      }>;
    }>;
    submitLabel?: string;
    successMessage?: string;
    errorMessage?: string;
  };
}

/**
 * Type for blog section
 */
export interface BlogSection extends SectionBase {
  _type: 'sectionBlog';
  description?: string;
  postsToShow?: number;
  showFeaturedOnly?: boolean;
  cta?: {
    _type: 'callToAction';
    label: string;
    url: string;
    isExternal?: boolean;
  };
}

/**
 * Type for calendar section
 */
export interface CalendarSection extends SectionBase {
  _type: 'sectionCalendar';
  description?: string;
  settings?: {
    _type: 'calendarSettings';
    timeSlots?: Array<{
      _key: string;
      _type: 'timeSlot';
      startTime: string;
      endTime: string;
      weekdays?: number[];
    }>;
  };
}

// Union type for all sections
export type Section =
  | HeaderSection
  | ContentSection
  | CardsSection
  | FeaturedSection
  | PricingSection
  | FAQSection
  | TimelineSection
  | TestimonialSection
  | FormSection
  | BlogSection
  | CalendarSection;
