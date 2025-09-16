/**
 * Central export file for all mock data and utilities
 * Provides easy access to all mocks across tests and stories
 */

// Email mocks
export {
  mockContactFormData,
  mockContactFormDataSpecialChars,
  mockContactFormDataLong,
  mockContactFormDataEmpty,
  mockEmailComponents,
  mockEmailResponses,
  mockEmailTemplates,
} from './email-mocks';

// Section mocks
export {
  mockHeaderSection,
  mockContentSection,
  mockCardsSection,
  mockFAQSection,
  mockTestimonialSection,
  mockPricingSection,
  mockBlogSection,
  mockTimelineSection,
  mockFeaturedSection,
  mockCalendarSection,
  mockFormSection,
} from './section-mocks';

// UI mocks
export {
  mockButtonVariants,
  mockFormData,
  mockNavigationData,
  mockAlertData,
  mockCardData,
  mockModalData,
  mockTableData,
  mockFormValidation,
  mockLoadingStates,
} from './ui-mocks';

// Configuration mocks
export {
  mockConfig,
  mockGlobalData,
  mockPageData,
  mockErrorData,
  mockLoadingData,
} from './config-mocks';

// Sanity mocks
export {
  mockSanityImage,
  mockSanityBlock,
  mockSanityDocument,
  mockSanityQuery,
  mockSanityResponse,
} from './sanity-mocks';
