export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AboutPage = Document & {
  __typename?: 'AboutPage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type AboutPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type AboutPageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type ApproachPage = Document & {
  __typename?: 'ApproachPage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ApproachPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ApproachPageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type Block = {
  __typename?: 'Block';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  children?: Maybe<Array<Maybe<Span>>>;
  level?: Maybe<Scalars['Float']['output']>;
  listItem?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
};

export type BlockOrImage = Block | Image;

export type BlogPage = Document & {
  __typename?: 'BlogPage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type BlogPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type BlogPageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CalendarSettings = {
  __typename?: 'CalendarSettings';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  availableDays?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  availableTimeSlots?: Maybe<Array<Maybe<TimeSlot>>>;
  excludedDates?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type CalendarSettingsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
};

export type CalendarSettingsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type CallToAction = {
  __typename?: 'CallToAction';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['String']['output']>;
};

export type CallToActionFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  link?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringFilter>;
  variant?: InputMaybe<StringFilter>;
};

export type CallToActionSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  link?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  variant?: InputMaybe<SortOrder>;
};

export type Card = {
  __typename?: 'Card';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  link?: Maybe<Link>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CardFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  link?: InputMaybe<LinkFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CardSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  link?: InputMaybe<LinkSorting>;
  title?: InputMaybe<SortOrder>;
};

export type CoachingPage = Document & {
  __typename?: 'CoachingPage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type CoachingPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type CoachingPageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type ContactPage = Document & {
  __typename?: 'ContactPage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ContactPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ContactPageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type CrossDatasetReference = {
  __typename?: 'CrossDatasetReference';
  _dataset?: Maybe<Scalars['String']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  _projectId?: Maybe<Scalars['String']['output']>;
  _ref?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  _weak?: Maybe<Scalars['Boolean']['output']>;
};

export type CrossDatasetReferenceFilter = {
  _dataset?: InputMaybe<StringFilter>;
  _key?: InputMaybe<StringFilter>;
  _projectId?: InputMaybe<StringFilter>;
  _ref?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _weak?: InputMaybe<BooleanFilter>;
};

export type CrossDatasetReferenceSorting = {
  _dataset?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _projectId?: InputMaybe<SortOrder>;
  _ref?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _weak?: InputMaybe<SortOrder>;
};

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Date']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Date']['input']>;
};

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A Sanity document */
export type Document = {
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DocumentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type DocumentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type FaqItem = {
  __typename?: 'FaqItem';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  answer?: Maybe<Scalars['String']['output']>;
  question?: Maybe<Scalars['String']['output']>;
};

export type FaqItemFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  answer?: InputMaybe<StringFilter>;
  question?: InputMaybe<StringFilter>;
};

export type FaqItemSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  answer?: InputMaybe<SortOrder>;
  question?: InputMaybe<SortOrder>;
};

export type FeatureItem = {
  __typename?: 'FeatureItem';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  title?: Maybe<Scalars['String']['output']>;
};

export type FeatureItemFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FeatureItemSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  title?: InputMaybe<SortOrder>;
};

export type File = {
  __typename?: 'File';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityFileAsset>;
};

export type FileFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityFileAssetFilter>;
};

export type FileSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
};

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Float']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type Footer = Document & {
  __typename?: 'Footer';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  contact?: Maybe<FooterContact>;
  copyright?: Maybe<Scalars['String']['output']>;
  socialLinks?: Maybe<Array<Maybe<SocialLink>>>;
};

export type FooterContact = {
  __typename?: 'FooterContact';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type FooterContactFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
};

export type FooterContactSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  phone?: InputMaybe<SortOrder>;
};

export type FooterFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  contact?: InputMaybe<FooterContactFilter>;
  copyright?: InputMaybe<StringFilter>;
};

export type FooterSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  contact?: InputMaybe<FooterContactSorting>;
  copyright?: InputMaybe<SortOrder>;
};

export type FormConfiguration = {
  __typename?: 'FormConfiguration';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  emailSubject?: Maybe<Scalars['String']['output']>;
  emailTo?: Maybe<Scalars['String']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  submitLabel?: Maybe<Scalars['String']['output']>;
  successMessage?: Maybe<Scalars['String']['output']>;
};

export type FormConfigurationFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  emailSubject?: InputMaybe<StringFilter>;
  emailTo?: InputMaybe<StringFilter>;
  errorMessage?: InputMaybe<StringFilter>;
  submitLabel?: InputMaybe<StringFilter>;
  successMessage?: InputMaybe<StringFilter>;
};

export type FormConfigurationSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  emailSubject?: InputMaybe<SortOrder>;
  emailTo?: InputMaybe<SortOrder>;
  errorMessage?: InputMaybe<SortOrder>;
  submitLabel?: InputMaybe<SortOrder>;
  successMessage?: InputMaybe<SortOrder>;
};

export type FormField = {
  __typename?: 'FormField';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type FormFieldFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  required?: InputMaybe<BooleanFilter>;
  type?: InputMaybe<StringFilter>;
};

export type FormFieldSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  required?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export type Geopoint = {
  __typename?: 'Geopoint';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  alt?: Maybe<Scalars['Float']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type GeopointFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alt?: InputMaybe<FloatFilter>;
  lat?: InputMaybe<FloatFilter>;
  lng?: InputMaybe<FloatFilter>;
};

export type GeopointSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alt?: InputMaybe<SortOrder>;
  lat?: InputMaybe<SortOrder>;
  lng?: InputMaybe<SortOrder>;
};

export type HomePage = Document & {
  __typename?: 'HomePage';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  metadata?: Maybe<Metadata>;
  sections?: Maybe<
    Array<
      Maybe<SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline>
    >
  >;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HomePageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HomePageSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<MetadataSorting>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
};

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['ID']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  __typename?: 'Image';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  crop?: Maybe<SanityImageCrop>;
  hotspot?: Maybe<SanityImageHotspot>;
};

export type ImageFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  asset?: InputMaybe<SanityImageAssetFilter>;
  crop?: InputMaybe<SanityImageCropFilter>;
  hotspot?: InputMaybe<SanityImageHotspotFilter>;
};

export type ImageSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  crop?: InputMaybe<SanityImageCropSorting>;
  hotspot?: InputMaybe<SanityImageHotspotSorting>;
};

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Int']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type Link = {
  __typename?: 'Link';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LinkFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  text?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type LinkSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type MenuFooter = Document & {
  __typename?: 'MenuFooter';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  about?: Maybe<MenuFooterAbout>;
  contact?: Maybe<MenuFooterContact>;
  social?: Maybe<MenuFooterSocial>;
};

export type MenuFooterAbout = {
  __typename?: 'MenuFooterAbout';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MenuFooterAboutFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MenuFooterAboutSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type MenuFooterContact = {
  __typename?: 'MenuFooterContact';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  generalEnquiry?: Maybe<MenuFooterEnquiry>;
  projectEnquiry?: Maybe<MenuFooterEnquiry>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MenuFooterContactFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  generalEnquiry?: InputMaybe<MenuFooterEnquiryFilter>;
  projectEnquiry?: InputMaybe<MenuFooterEnquiryFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MenuFooterContactSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  generalEnquiry?: InputMaybe<MenuFooterEnquirySorting>;
  projectEnquiry?: InputMaybe<MenuFooterEnquirySorting>;
  title?: InputMaybe<SortOrder>;
};

export type MenuFooterEnquiry = {
  __typename?: 'MenuFooterEnquiry';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  linkText?: Maybe<Scalars['String']['output']>;
};

export type MenuFooterEnquiryFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  href?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  linkText?: InputMaybe<StringFilter>;
};

export type MenuFooterEnquirySorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  href?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  linkText?: InputMaybe<SortOrder>;
};

export type MenuFooterFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  about?: InputMaybe<MenuFooterAboutFilter>;
  contact?: InputMaybe<MenuFooterContactFilter>;
  social?: InputMaybe<MenuFooterSocialFilter>;
};

export type MenuFooterSocial = {
  __typename?: 'MenuFooterSocial';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MenuFooterSocialFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MenuFooterSocialSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type MenuFooterSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  about?: InputMaybe<MenuFooterAboutSorting>;
  contact?: InputMaybe<MenuFooterContactSorting>;
  social?: InputMaybe<MenuFooterSocialSorting>;
};

export type Metadata = {
  __typename?: 'Metadata';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Description for search engines and social sharing (150-160 characters recommended) */
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** If checked, this page will not be indexed by search engines */
  noindex?: Maybe<Scalars['Boolean']['output']>;
  /** Title for search engines and social sharing (50-60 characters recommended) */
  title?: Maybe<Scalars['String']['output']>;
};

export type MetadataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  noindex?: InputMaybe<BooleanFilter>;
  title?: InputMaybe<StringFilter>;
};

export type MetadataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  noindex?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Navigation = Document & {
  __typename?: 'Navigation';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  items?: Maybe<Array<Maybe<NavigationItem>>>;
};

export type NavigationFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
};

export type NavigationItem = {
  __typename?: 'NavigationItem';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

export type NavigationItemFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  href?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
};

export type NavigationItemSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  href?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
};

export type NavigationSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
};

export type Post = Document & {
  __typename?: 'Post';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  contentRaw?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['Boolean']['output']>;
  image?: Maybe<Image>;
  metadata?: Maybe<Metadata>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  slug?: Maybe<Slug>;
  title?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['String']['output']>;
};

export type PostFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  featured?: InputMaybe<BooleanFilter>;
  image?: InputMaybe<ImageFilter>;
  metadata?: InputMaybe<MetadataFilter>;
  publishedAt?: InputMaybe<DatetimeFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  variant?: InputMaybe<StringFilter>;
};

export type PostSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  featured?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  metadata?: InputMaybe<MetadataSorting>;
  publishedAt?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SlugSorting>;
  title?: InputMaybe<SortOrder>;
  variant?: InputMaybe<SortOrder>;
};

export type PricingCard = {
  __typename?: 'PricingCard';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  cta?: Maybe<CallToAction>;
  description?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  isPopular?: Maybe<Scalars['Boolean']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  variant?: Maybe<Scalars['String']['output']>;
};

export type PricingCardFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  cta?: InputMaybe<CallToActionFilter>;
  description?: InputMaybe<StringFilter>;
  isPopular?: InputMaybe<BooleanFilter>;
  price?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  variant?: InputMaybe<StringFilter>;
};

export type PricingCardSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  cta?: InputMaybe<CallToActionSorting>;
  description?: InputMaybe<SortOrder>;
  isPopular?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  variant?: InputMaybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  AboutPage?: Maybe<AboutPage>;
  ApproachPage?: Maybe<ApproachPage>;
  BlogPage?: Maybe<BlogPage>;
  CoachingPage?: Maybe<CoachingPage>;
  ContactPage?: Maybe<ContactPage>;
  Document?: Maybe<Document>;
  Footer?: Maybe<Footer>;
  HomePage?: Maybe<HomePage>;
  MenuFooter?: Maybe<MenuFooter>;
  Navigation?: Maybe<Navigation>;
  Post?: Maybe<Post>;
  SanityFileAsset?: Maybe<SanityFileAsset>;
  SanityImageAsset?: Maybe<SanityImageAsset>;
  SectionBlog?: Maybe<SectionBlog>;
  SectionCalendar?: Maybe<SectionCalendar>;
  SectionCards?: Maybe<SectionCards>;
  SectionContent?: Maybe<SectionContent>;
  SectionFAQ?: Maybe<SectionFaq>;
  SectionFeatured?: Maybe<SectionFeatured>;
  SectionForm?: Maybe<SectionForm>;
  SectionHeader?: Maybe<SectionHeader>;
  SectionPricing?: Maybe<SectionPricing>;
  SectionTestimonial?: Maybe<SectionTestimonial>;
  SectionTimeline?: Maybe<SectionTimeline>;
  SiteSettings?: Maybe<SiteSettings>;
  allAboutPage: Array<AboutPage>;
  allApproachPage: Array<ApproachPage>;
  allBlogPage: Array<BlogPage>;
  allCoachingPage: Array<CoachingPage>;
  allContactPage: Array<ContactPage>;
  allDocument: Array<Document>;
  allFooter: Array<Footer>;
  allHomePage: Array<HomePage>;
  allMenuFooter: Array<MenuFooter>;
  allNavigation: Array<Navigation>;
  allPost: Array<Post>;
  allSanityFileAsset: Array<SanityFileAsset>;
  allSanityImageAsset: Array<SanityImageAsset>;
  allSectionBlog: Array<SectionBlog>;
  allSectionCalendar: Array<SectionCalendar>;
  allSectionCards: Array<SectionCards>;
  allSectionContent: Array<SectionContent>;
  allSectionFAQ: Array<SectionFaq>;
  allSectionFeatured: Array<SectionFeatured>;
  allSectionForm: Array<SectionForm>;
  allSectionHeader: Array<SectionHeader>;
  allSectionPricing: Array<SectionPricing>;
  allSectionTestimonial: Array<SectionTestimonial>;
  allSectionTimeline: Array<SectionTimeline>;
  allSiteSettings: Array<SiteSettings>;
};

export type RootQueryAboutPageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryApproachPageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryBlogPageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryCoachingPageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryContactPageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryDocumentArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryFooterArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryHomePageArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryMenuFooterArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryNavigationArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryPostArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionBlogArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionCalendarArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionCardsArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionContentArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionFaqArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionFeaturedArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionFormArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionHeaderArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionPricingArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionTestimonialArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySectionTimelineArgs = {
  id: Scalars['ID']['input'];
};

export type RootQuerySiteSettingsArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryAllAboutPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AboutPageSorting>>;
  where?: InputMaybe<AboutPageFilter>;
};

export type RootQueryAllApproachPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ApproachPageSorting>>;
  where?: InputMaybe<ApproachPageFilter>;
};

export type RootQueryAllBlogPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<BlogPageSorting>>;
  where?: InputMaybe<BlogPageFilter>;
};

export type RootQueryAllCoachingPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CoachingPageSorting>>;
  where?: InputMaybe<CoachingPageFilter>;
};

export type RootQueryAllContactPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ContactPageSorting>>;
  where?: InputMaybe<ContactPageFilter>;
};

export type RootQueryAllDocumentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DocumentSorting>>;
  where?: InputMaybe<DocumentFilter>;
};

export type RootQueryAllFooterArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<FooterSorting>>;
  where?: InputMaybe<FooterFilter>;
};

export type RootQueryAllHomePageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HomePageSorting>>;
  where?: InputMaybe<HomePageFilter>;
};

export type RootQueryAllMenuFooterArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MenuFooterSorting>>;
  where?: InputMaybe<MenuFooterFilter>;
};

export type RootQueryAllNavigationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<NavigationSorting>>;
  where?: InputMaybe<NavigationFilter>;
};

export type RootQueryAllPostArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PostSorting>>;
  where?: InputMaybe<PostFilter>;
};

export type RootQueryAllSanityFileAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityFileAssetSorting>>;
  where?: InputMaybe<SanityFileAssetFilter>;
};

export type RootQueryAllSanityImageAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SanityImageAssetSorting>>;
  where?: InputMaybe<SanityImageAssetFilter>;
};

export type RootQueryAllSectionBlogArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionBlogSorting>>;
  where?: InputMaybe<SectionBlogFilter>;
};

export type RootQueryAllSectionCalendarArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionCalendarSorting>>;
  where?: InputMaybe<SectionCalendarFilter>;
};

export type RootQueryAllSectionCardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionCardsSorting>>;
  where?: InputMaybe<SectionCardsFilter>;
};

export type RootQueryAllSectionContentArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionContentSorting>>;
  where?: InputMaybe<SectionContentFilter>;
};

export type RootQueryAllSectionFaqArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionFaqSorting>>;
  where?: InputMaybe<SectionFaqFilter>;
};

export type RootQueryAllSectionFeaturedArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionFeaturedSorting>>;
  where?: InputMaybe<SectionFeaturedFilter>;
};

export type RootQueryAllSectionFormArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionFormSorting>>;
  where?: InputMaybe<SectionFormFilter>;
};

export type RootQueryAllSectionHeaderArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionHeaderSorting>>;
  where?: InputMaybe<SectionHeaderFilter>;
};

export type RootQueryAllSectionPricingArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionPricingSorting>>;
  where?: InputMaybe<SectionPricingFilter>;
};

export type RootQueryAllSectionTestimonialArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionTestimonialSorting>>;
  where?: InputMaybe<SectionTestimonialFilter>;
};

export type RootQueryAllSectionTimelineArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SectionTimelineSorting>>;
  where?: InputMaybe<SectionTimelineFilter>;
};

export type RootQueryAllSiteSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SiteSettingsSorting>>;
  where?: InputMaybe<SiteSettingsFilter>;
};

export type SanityAssetSourceData = {
  __typename?: 'SanityAssetSourceData';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']['output']>;
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']['output']>;
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityAssetSourceDataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityAssetSourceDataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityFileAsset = Document & {
  __typename?: 'SanityFileAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityFileAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageAsset = Document & {
  __typename?: 'SanityImageAsset';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  altText?: Maybe<Scalars['String']['output']>;
  assetId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<SanityImageMetadata>;
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha1hash?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Float']['output']>;
  source?: Maybe<SanityAssetSourceData>;
  title?: Maybe<Scalars['String']['output']>;
  uploadId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  altText?: InputMaybe<StringFilter>;
  assetId?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  extension?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  metadata?: InputMaybe<SanityImageMetadataFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  path?: InputMaybe<StringFilter>;
  sha1hash?: InputMaybe<StringFilter>;
  size?: InputMaybe<FloatFilter>;
  source?: InputMaybe<SanityAssetSourceDataFilter>;
  title?: InputMaybe<StringFilter>;
  uploadId?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SanityImageAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  altText?: InputMaybe<SortOrder>;
  assetId?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  extension?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  metadata?: InputMaybe<SanityImageMetadataSorting>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  path?: InputMaybe<SortOrder>;
  sha1hash?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  source?: InputMaybe<SanityAssetSourceDataSorting>;
  title?: InputMaybe<SortOrder>;
  uploadId?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type SanityImageCrop = {
  __typename?: 'SanityImageCrop';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  bottom?: Maybe<Scalars['Float']['output']>;
  left?: Maybe<Scalars['Float']['output']>;
  right?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageCropFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  bottom?: InputMaybe<FloatFilter>;
  left?: InputMaybe<FloatFilter>;
  right?: InputMaybe<FloatFilter>;
  top?: InputMaybe<FloatFilter>;
};

export type SanityImageCropSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  bottom?: InputMaybe<SortOrder>;
  left?: InputMaybe<SortOrder>;
  right?: InputMaybe<SortOrder>;
  top?: InputMaybe<SortOrder>;
};

export type SanityImageDimensions = {
  __typename?: 'SanityImageDimensions';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  aspectRatio?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageDimensionsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  aspectRatio?: InputMaybe<FloatFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
};

export type SanityImageDimensionsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  aspectRatio?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type SanityImageHotspot = {
  __typename?: 'SanityImageHotspot';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
  x?: Maybe<Scalars['Float']['output']>;
  y?: Maybe<Scalars['Float']['output']>;
};

export type SanityImageHotspotFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatFilter>;
  width?: InputMaybe<FloatFilter>;
  x?: InputMaybe<FloatFilter>;
  y?: InputMaybe<FloatFilter>;
};

export type SanityImageHotspotSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
  x?: InputMaybe<SortOrder>;
  y?: InputMaybe<SortOrder>;
};

export type SanityImageMetadata = {
  __typename?: 'SanityImageMetadata';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  blurHash?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<SanityImageDimensions>;
  hasAlpha?: Maybe<Scalars['Boolean']['output']>;
  isOpaque?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Geopoint>;
  lqip?: Maybe<Scalars['String']['output']>;
  palette?: Maybe<SanityImagePalette>;
};

export type SanityImageMetadataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  blurHash?: InputMaybe<StringFilter>;
  dimensions?: InputMaybe<SanityImageDimensionsFilter>;
  hasAlpha?: InputMaybe<BooleanFilter>;
  isOpaque?: InputMaybe<BooleanFilter>;
  location?: InputMaybe<GeopointFilter>;
  lqip?: InputMaybe<StringFilter>;
  palette?: InputMaybe<SanityImagePaletteFilter>;
};

export type SanityImageMetadataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  blurHash?: InputMaybe<SortOrder>;
  dimensions?: InputMaybe<SanityImageDimensionsSorting>;
  hasAlpha?: InputMaybe<SortOrder>;
  isOpaque?: InputMaybe<SortOrder>;
  location?: InputMaybe<GeopointSorting>;
  lqip?: InputMaybe<SortOrder>;
  palette?: InputMaybe<SanityImagePaletteSorting>;
};

export type SanityImagePalette = {
  __typename?: 'SanityImagePalette';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  darkMuted?: Maybe<SanityImagePaletteSwatch>;
  darkVibrant?: Maybe<SanityImagePaletteSwatch>;
  dominant?: Maybe<SanityImagePaletteSwatch>;
  lightMuted?: Maybe<SanityImagePaletteSwatch>;
  lightVibrant?: Maybe<SanityImagePaletteSwatch>;
  muted?: Maybe<SanityImagePaletteSwatch>;
  vibrant?: Maybe<SanityImagePaletteSwatch>;
};

export type SanityImagePaletteFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  dominant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
  muted?: InputMaybe<SanityImagePaletteSwatchFilter>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchFilter>;
};

export type SanityImagePaletteSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  darkMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  dominant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightMuted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
  muted?: InputMaybe<SanityImagePaletteSwatchSorting>;
  vibrant?: InputMaybe<SanityImagePaletteSwatchSorting>;
};

export type SanityImagePaletteSwatch = {
  __typename?: 'SanityImagePaletteSwatch';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  foreground?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SanityImagePaletteSwatchFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  background?: InputMaybe<StringFilter>;
  foreground?: InputMaybe<StringFilter>;
  population?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SanityImagePaletteSwatchSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  foreground?: InputMaybe<SortOrder>;
  population?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Sanity_DocumentFilter = {
  /** All documents that are drafts. */
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  /** All documents referencing the given document ID. */
  references?: InputMaybe<Scalars['ID']['input']>;
};

export type SectionBlog = Document & {
  __typename?: 'SectionBlog';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  postsToShow?: Maybe<Scalars['Float']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  showFeaturedOnly?: Maybe<Scalars['Boolean']['output']>;
  sortOrder?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionBlogFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  postsToShow?: InputMaybe<FloatFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  showFeaturedOnly?: InputMaybe<BooleanFilter>;
  sortOrder?: InputMaybe<StringFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionBlogOrSectionCalendarOrSectionCardsOrSectionContentOrSectionFaqOrSectionFeaturedOrSectionFormOrSectionHeaderOrSectionPricingOrSectionTestimonialOrSectionTimeline =

    | SectionBlog
    | SectionCalendar
    | SectionCards
    | SectionContent
    | SectionFaq
    | SectionFeatured
    | SectionForm
    | SectionHeader
    | SectionPricing
    | SectionTestimonial
    | SectionTimeline;

export type SectionBlogSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  postsToShow?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  showFeaturedOnly?: InputMaybe<SortOrder>;
  sortOrder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionCalendar = Document & {
  __typename?: 'SectionCalendar';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  settings?: Maybe<CalendarSettings>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionCalendarFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  settings?: InputMaybe<CalendarSettingsFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionCalendarSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  settings?: InputMaybe<CalendarSettingsSorting>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionCards = Document & {
  __typename?: 'SectionCards';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  cards?: Maybe<Array<Maybe<Card>>>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionCardsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionCardsSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionContent = Document & {
  __typename?: 'SectionContent';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  contentRaw?: Maybe<Scalars['JSON']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionContentFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionContentSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionFaq = Document & {
  __typename?: 'SectionFAQ';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  questions?: Maybe<Array<Maybe<FaqItem>>>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionFaqFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionFaqSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionFeatured = Document & {
  __typename?: 'SectionFeatured';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Maybe<FeatureItem>>>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionFeaturedFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionFeaturedSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionForm = Document & {
  __typename?: 'SectionForm';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  form?: Maybe<FormConfiguration>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionFormFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  form?: InputMaybe<FormConfigurationFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionFormSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  form?: InputMaybe<FormConfigurationSorting>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionHeader = Document & {
  __typename?: 'SectionHeader';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  cta?: Maybe<CallToAction>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionHeaderFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  cta?: InputMaybe<CallToActionFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionHeaderSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  cta?: InputMaybe<CallToActionSorting>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionPricing = Document & {
  __typename?: 'SectionPricing';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  pricingCards?: Maybe<Array<Maybe<PricingCard>>>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionPricingFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionPricingSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionTestimonial = Document & {
  __typename?: 'SectionTestimonial';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  testimonials?: Maybe<Array<Maybe<Testimonial>>>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionTestimonialFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionTestimonialSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SectionTimeline = Document & {
  __typename?: 'SectionTimeline';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  background?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  /** Title that will be displayed on the website (optional) */
  displayTitle?: Maybe<Scalars['String']['output']>;
  events?: Maybe<Array<Maybe<TimelineEvent>>>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  showBorder?: Maybe<Scalars['Boolean']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Title for internal reference only */
  title?: Maybe<Scalars['String']['output']>;
};

export type SectionTimelineFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  background?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  displayTitle?: InputMaybe<StringFilter>;
  maxWidth?: InputMaybe<StringFilter>;
  showBorder?: InputMaybe<BooleanFilter>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SectionTimelineSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  background?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  displayTitle?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  showBorder?: InputMaybe<SortOrder>;
  subtitle?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type SiteSettings = Document & {
  __typename?: 'SiteSettings';
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>;
  _key?: Maybe<Scalars['String']['output']>;
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>;
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>;
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>;
  defaultMetaImage?: Maybe<Image>;
  description?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type SiteSettingsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  defaultMetaImage?: InputMaybe<ImageFilter>;
  description?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type SiteSettingsSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  defaultMetaImage?: InputMaybe<ImageSorting>;
  description?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type Slug = {
  __typename?: 'Slug';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  current?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type SlugFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  current?: InputMaybe<StringFilter>;
  source?: InputMaybe<StringFilter>;
};

export type SlugSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  current?: InputMaybe<SortOrder>;
  source?: InputMaybe<SortOrder>;
};

export type SocialLink = {
  __typename?: 'SocialLink';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type SocialLinkFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  platform?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type SocialLinkSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  platform?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC',
}

export type Span = {
  __typename?: 'Span';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  marks?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  text?: Maybe<Scalars['String']['output']>;
};

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['String']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Testimonial = {
  __typename?: 'Testimonial';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Image>;
  name?: Maybe<Scalars['String']['output']>;
  quote?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type TestimonialFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  image?: InputMaybe<ImageFilter>;
  name?: InputMaybe<StringFilter>;
  quote?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
};

export type TestimonialSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  image?: InputMaybe<ImageSorting>;
  name?: InputMaybe<SortOrder>;
  quote?: InputMaybe<SortOrder>;
  role?: InputMaybe<SortOrder>;
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
};

export type TimeSlotFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  endTime?: InputMaybe<StringFilter>;
  startTime?: InputMaybe<StringFilter>;
};

export type TimeSlotSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  endTime?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
};

export type TimelineEvent = {
  __typename?: 'TimelineEvent';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TimelineEventFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  date?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type TimelineEventSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  date?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type FooterFieldsFragment = {
  __typename?: 'Footer';
  copyright?: string;
  contact?: { __typename?: 'FooterContact'; email?: string; phone?: string };
  socialLinks?: Array<{
    __typename?: 'SocialLink';
    _key?: string;
    platform?: string;
    url?: string;
  }>;
};

export type ImageFieldsFragment = {
  __typename?: 'Image';
  asset?: {
    __typename?: 'SanityImageAsset';
    _id?: string;
    url?: string;
    altText?: string;
    metadata?: {
      __typename?: 'SanityImageMetadata';
      lqip?: string;
      dimensions?: {
        __typename?: 'SanityImageDimensions';
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
  hotspot?: {
    __typename?: 'SanityImageHotspot';
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: {
    __typename?: 'SanityImageCrop';
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export type MenuFooterFieldsFragment = {
  __typename?: 'MenuFooter';
  about?: {
    __typename?: 'MenuFooterAbout';
    title?: string;
    description?: string;
  };
  social?: { __typename?: 'MenuFooterSocial'; title?: string };
  contact?: {
    __typename?: 'MenuFooterContact';
    title?: string;
    projectEnquiry?: {
      __typename?: 'MenuFooterEnquiry';
      label?: string;
      href?: string;
      linkText?: string;
    };
    generalEnquiry?: {
      __typename?: 'MenuFooterEnquiry';
      label?: string;
      href?: string;
      linkText?: string;
    };
  };
};

export type MetadataFieldsFragment = {
  __typename?: 'Metadata';
  title?: string;
  description?: string;
  keywords?: Array<string>;
  noindex?: boolean;
  image?: {
    __typename?: 'Image';
    asset?: { __typename?: 'SanityImageAsset'; url?: string; altText?: string };
  };
};

export type NavigationFieldsFragment = {
  __typename?: 'Navigation';
  items?: Array<{
    __typename?: 'NavigationItem';
    _key?: string;
    label?: string;
    href?: string;
  }>;
};

export type PageFieldsFragment = {
  __typename?: 'AboutPage';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    noindex?: boolean;
    image?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        url?: string;
        altText?: string;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        postsToShow?: number;
        showFeaturedOnly?: boolean;
        sortOrder?: string;
      }
    | {
        __typename?: 'SectionCalendar';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        settings?: {
          __typename?: 'CalendarSettings';
          availableDays?: Array<string>;
          excludedDates?: Array<string>;
          availableTimeSlots?: Array<{
            __typename?: 'TimeSlot';
            startTime?: string;
            endTime?: string;
          }>;
        };
      }
    | {
        __typename?: 'SectionCards';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        cards?: Array<{
          __typename?: 'Card';
          _key?: string;
          title?: string;
          description?: string;
          image?: {
            __typename?: 'Image';
            asset?: {
              __typename?: 'SanityImageAsset';
              _id?: string;
              url?: string;
              altText?: string;
              metadata?: {
                __typename?: 'SanityImageMetadata';
                lqip?: string;
                dimensions?: {
                  __typename?: 'SanityImageDimensions';
                  width?: number;
                  height?: number;
                  aspectRatio?: number;
                };
              };
            };
            hotspot?: {
              __typename?: 'SanityImageHotspot';
              x?: number;
              y?: number;
              height?: number;
              width?: number;
            };
            crop?: {
              __typename?: 'SanityImageCrop';
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
            };
          };
          link?: { __typename?: 'Link'; text?: string; url?: string };
        }>;
      }
    | {
        __typename?: 'SectionContent';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        contentRaw?: any;
      }
    | {
        __typename?: 'SectionFAQ';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        questions?: Array<{
          __typename?: 'FaqItem';
          _key?: string;
          question?: string;
          answer?: string;
        }>;
      }
    | {
        __typename?: 'SectionFeatured';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        items?: Array<{
          __typename?: 'FeatureItem';
          _key?: string;
          title?: string;
          description?: string;
          image?: {
            __typename?: 'Image';
            asset?: {
              __typename?: 'SanityImageAsset';
              _id?: string;
              url?: string;
              altText?: string;
              metadata?: {
                __typename?: 'SanityImageMetadata';
                lqip?: string;
                dimensions?: {
                  __typename?: 'SanityImageDimensions';
                  width?: number;
                  height?: number;
                  aspectRatio?: number;
                };
              };
            };
            hotspot?: {
              __typename?: 'SanityImageHotspot';
              x?: number;
              y?: number;
              height?: number;
              width?: number;
            };
            crop?: {
              __typename?: 'SanityImageCrop';
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
            };
          };
        }>;
      }
    | {
        __typename?: 'SectionForm';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailSubject?: string;
          emailTo?: string;
          errorMessage?: string;
          submitLabel?: string;
          successMessage?: string;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        image?: {
          __typename?: 'Image';
          asset?: {
            __typename?: 'SanityImageAsset';
            _id?: string;
            url?: string;
            altText?: string;
            metadata?: {
              __typename?: 'SanityImageMetadata';
              lqip?: string;
              dimensions?: {
                __typename?: 'SanityImageDimensions';
                width?: number;
                height?: number;
                aspectRatio?: number;
              };
            };
          };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
            height?: number;
            width?: number;
          };
          crop?: {
            __typename?: 'SanityImageCrop';
            top?: number;
            bottom?: number;
            left?: number;
            right?: number;
          };
        };
        cta?: {
          __typename?: 'CallToAction';
          text?: string;
          link?: string;
          variant?: string;
        };
      }
    | {
        __typename?: 'SectionPricing';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        pricingCards?: Array<{
          __typename?: 'PricingCard';
          _key?: string;
          title?: string;
          description?: string;
          price?: string;
          features?: Array<string>;
          isPopular?: boolean;
          variant?: string;
          cta?: {
            __typename?: 'CallToAction';
            text?: string;
            link?: string;
            variant?: string;
          };
        }>;
      }
    | {
        __typename?: 'SectionTestimonial';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        testimonials?: Array<{
          __typename?: 'Testimonial';
          _key?: string;
          name?: string;
          role?: string;
          quote?: string;
          image?: {
            __typename?: 'Image';
            asset?: {
              __typename?: 'SanityImageAsset';
              _id?: string;
              url?: string;
              altText?: string;
              metadata?: {
                __typename?: 'SanityImageMetadata';
                lqip?: string;
                dimensions?: {
                  __typename?: 'SanityImageDimensions';
                  width?: number;
                  height?: number;
                  aspectRatio?: number;
                };
              };
            };
            hotspot?: {
              __typename?: 'SanityImageHotspot';
              x?: number;
              y?: number;
              height?: number;
              width?: number;
            };
            crop?: {
              __typename?: 'SanityImageCrop';
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
            };
          };
        }>;
      }
    | {
        __typename?: 'SectionTimeline';
        _id?: string;
        _type?: string;
        _key?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        events?: Array<{
          __typename?: 'TimelineEvent';
          _key?: string;
          title?: string;
          date?: string;
          description?: string;
        }>;
      }
  >;
  slug?: { __typename?: 'Slug'; current?: string };
};

export type PostFieldsFragment = {
  __typename?: 'Post';
  _id?: string;
  _type?: string;
  title?: string;
  description?: string;
  publishedAt?: any;
  categories?: Array<string>;
  featured?: boolean;
  variant?: string;
  contentRaw?: any;
  slug?: { __typename?: 'Slug'; current?: string };
  image?: {
    __typename?: 'Image';
    asset?: {
      __typename?: 'SanityImageAsset';
      _id?: string;
      url?: string;
      altText?: string;
      metadata?: {
        __typename?: 'SanityImageMetadata';
        lqip?: string;
        dimensions?: {
          __typename?: 'SanityImageDimensions';
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
    hotspot?: {
      __typename?: 'SanityImageHotspot';
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    crop?: {
      __typename?: 'SanityImageCrop';
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  };
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    noindex?: boolean;
    image?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        url?: string;
        altText?: string;
      };
    };
  };
};

export type SectionBlogFieldsFragment = {
  __typename?: 'SectionBlog';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  postsToShow?: number;
  showFeaturedOnly?: boolean;
  sortOrder?: string;
};

export type SectionCalendarFieldsFragment = {
  __typename?: 'SectionCalendar';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  settings?: {
    __typename?: 'CalendarSettings';
    availableDays?: Array<string>;
    excludedDates?: Array<string>;
    availableTimeSlots?: Array<{
      __typename?: 'TimeSlot';
      startTime?: string;
      endTime?: string;
    }>;
  };
};

export type SectionCardsFieldsFragment = {
  __typename?: 'SectionCards';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  cards?: Array<{
    __typename?: 'Card';
    _key?: string;
    title?: string;
    description?: string;
    image?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        _id?: string;
        url?: string;
        altText?: string;
        metadata?: {
          __typename?: 'SanityImageMetadata';
          lqip?: string;
          dimensions?: {
            __typename?: 'SanityImageDimensions';
            width?: number;
            height?: number;
            aspectRatio?: number;
          };
        };
      };
      hotspot?: {
        __typename?: 'SanityImageHotspot';
        x?: number;
        y?: number;
        height?: number;
        width?: number;
      };
      crop?: {
        __typename?: 'SanityImageCrop';
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
    };
    link?: { __typename?: 'Link'; text?: string; url?: string };
  }>;
};

export type SectionContentFieldsFragment = {
  __typename?: 'SectionContent';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  contentRaw?: any;
};

export type SectionFaqFieldsFragment = {
  __typename?: 'SectionFAQ';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  questions?: Array<{
    __typename?: 'FaqItem';
    _key?: string;
    question?: string;
    answer?: string;
  }>;
};

export type SectionFeaturedFieldsFragment = {
  __typename?: 'SectionFeatured';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  items?: Array<{
    __typename?: 'FeatureItem';
    _key?: string;
    title?: string;
    description?: string;
    image?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        _id?: string;
        url?: string;
        altText?: string;
        metadata?: {
          __typename?: 'SanityImageMetadata';
          lqip?: string;
          dimensions?: {
            __typename?: 'SanityImageDimensions';
            width?: number;
            height?: number;
            aspectRatio?: number;
          };
        };
      };
      hotspot?: {
        __typename?: 'SanityImageHotspot';
        x?: number;
        y?: number;
        height?: number;
        width?: number;
      };
      crop?: {
        __typename?: 'SanityImageCrop';
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
    };
  }>;
};

export type SectionFormFieldsFragment = {
  __typename?: 'SectionForm';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  form?: {
    __typename?: 'FormConfiguration';
    emailSubject?: string;
    emailTo?: string;
    errorMessage?: string;
    submitLabel?: string;
    successMessage?: string;
  };
};

export type SectionHeaderFieldsFragment = {
  __typename?: 'SectionHeader';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  image?: {
    __typename?: 'Image';
    asset?: {
      __typename?: 'SanityImageAsset';
      _id?: string;
      url?: string;
      altText?: string;
      metadata?: {
        __typename?: 'SanityImageMetadata';
        lqip?: string;
        dimensions?: {
          __typename?: 'SanityImageDimensions';
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
      };
    };
    hotspot?: {
      __typename?: 'SanityImageHotspot';
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
    crop?: {
      __typename?: 'SanityImageCrop';
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  };
  cta?: {
    __typename?: 'CallToAction';
    text?: string;
    link?: string;
    variant?: string;
  };
};

export type SectionPricingFieldsFragment = {
  __typename?: 'SectionPricing';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  pricingCards?: Array<{
    __typename?: 'PricingCard';
    _key?: string;
    title?: string;
    description?: string;
    price?: string;
    features?: Array<string>;
    isPopular?: boolean;
    variant?: string;
    cta?: {
      __typename?: 'CallToAction';
      text?: string;
      link?: string;
      variant?: string;
    };
  }>;
};

export type SectionTestimonialFieldsFragment = {
  __typename?: 'SectionTestimonial';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  testimonials?: Array<{
    __typename?: 'Testimonial';
    _key?: string;
    name?: string;
    role?: string;
    quote?: string;
    image?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        _id?: string;
        url?: string;
        altText?: string;
        metadata?: {
          __typename?: 'SanityImageMetadata';
          lqip?: string;
          dimensions?: {
            __typename?: 'SanityImageDimensions';
            width?: number;
            height?: number;
            aspectRatio?: number;
          };
        };
      };
      hotspot?: {
        __typename?: 'SanityImageHotspot';
        x?: number;
        y?: number;
        height?: number;
        width?: number;
      };
      crop?: {
        __typename?: 'SanityImageCrop';
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
    };
  }>;
};

export type SectionTimelineFieldsFragment = {
  __typename?: 'SectionTimeline';
  _id?: string;
  _type?: string;
  _key?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  events?: Array<{
    __typename?: 'TimelineEvent';
    _key?: string;
    title?: string;
    date?: string;
    description?: string;
  }>;
};

export type GetPageQueryVariables = Exact<{ [key: string]: never }>;

export type GetPageQuery = {
  __typename?: 'RootQuery';
  allAboutPage: Array<{
    __typename?: 'AboutPage';
    _id?: string;
    _createdAt?: any;
    _updatedAt?: any;
    _rev?: string;
    _type?: string;
    title?: string;
    metadata?: {
      __typename?: 'Metadata';
      title?: string;
      description?: string;
      keywords?: Array<string>;
      noindex?: boolean;
      image?: {
        __typename?: 'Image';
        asset?: {
          __typename?: 'SanityImageAsset';
          url?: string;
          altText?: string;
        };
      };
    };
    sections?: Array<
      | {
          __typename?: 'SectionBlog';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          postsToShow?: number;
          showFeaturedOnly?: boolean;
          sortOrder?: string;
        }
      | {
          __typename?: 'SectionCalendar';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          settings?: {
            __typename?: 'CalendarSettings';
            availableDays?: Array<string>;
            excludedDates?: Array<string>;
            availableTimeSlots?: Array<{
              __typename?: 'TimeSlot';
              startTime?: string;
              endTime?: string;
            }>;
          };
        }
      | {
          __typename?: 'SectionCards';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          cards?: Array<{
            __typename?: 'Card';
            _key?: string;
            title?: string;
            description?: string;
            image?: {
              __typename?: 'Image';
              asset?: {
                __typename?: 'SanityImageAsset';
                _id?: string;
                url?: string;
                altText?: string;
                metadata?: {
                  __typename?: 'SanityImageMetadata';
                  lqip?: string;
                  dimensions?: {
                    __typename?: 'SanityImageDimensions';
                    width?: number;
                    height?: number;
                    aspectRatio?: number;
                  };
                };
              };
              hotspot?: {
                __typename?: 'SanityImageHotspot';
                x?: number;
                y?: number;
                height?: number;
                width?: number;
              };
              crop?: {
                __typename?: 'SanityImageCrop';
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
              };
            };
            link?: { __typename?: 'Link'; text?: string; url?: string };
          }>;
        }
      | {
          __typename?: 'SectionContent';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          contentRaw?: any;
        }
      | {
          __typename?: 'SectionFAQ';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          questions?: Array<{
            __typename?: 'FaqItem';
            _key?: string;
            question?: string;
            answer?: string;
          }>;
        }
      | {
          __typename?: 'SectionFeatured';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          items?: Array<{
            __typename?: 'FeatureItem';
            _key?: string;
            title?: string;
            description?: string;
            image?: {
              __typename?: 'Image';
              asset?: {
                __typename?: 'SanityImageAsset';
                _id?: string;
                url?: string;
                altText?: string;
                metadata?: {
                  __typename?: 'SanityImageMetadata';
                  lqip?: string;
                  dimensions?: {
                    __typename?: 'SanityImageDimensions';
                    width?: number;
                    height?: number;
                    aspectRatio?: number;
                  };
                };
              };
              hotspot?: {
                __typename?: 'SanityImageHotspot';
                x?: number;
                y?: number;
                height?: number;
                width?: number;
              };
              crop?: {
                __typename?: 'SanityImageCrop';
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
              };
            };
          }>;
        }
      | {
          __typename?: 'SectionForm';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          form?: {
            __typename?: 'FormConfiguration';
            emailSubject?: string;
            emailTo?: string;
            errorMessage?: string;
            submitLabel?: string;
            successMessage?: string;
          };
        }
      | {
          __typename?: 'SectionHeader';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          image?: {
            __typename?: 'Image';
            asset?: {
              __typename?: 'SanityImageAsset';
              _id?: string;
              url?: string;
              altText?: string;
              metadata?: {
                __typename?: 'SanityImageMetadata';
                lqip?: string;
                dimensions?: {
                  __typename?: 'SanityImageDimensions';
                  width?: number;
                  height?: number;
                  aspectRatio?: number;
                };
              };
            };
            hotspot?: {
              __typename?: 'SanityImageHotspot';
              x?: number;
              y?: number;
              height?: number;
              width?: number;
            };
            crop?: {
              __typename?: 'SanityImageCrop';
              top?: number;
              bottom?: number;
              left?: number;
              right?: number;
            };
          };
          cta?: {
            __typename?: 'CallToAction';
            text?: string;
            link?: string;
            variant?: string;
          };
        }
      | {
          __typename?: 'SectionPricing';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          pricingCards?: Array<{
            __typename?: 'PricingCard';
            _key?: string;
            title?: string;
            description?: string;
            price?: string;
            features?: Array<string>;
            isPopular?: boolean;
            variant?: string;
            cta?: {
              __typename?: 'CallToAction';
              text?: string;
              link?: string;
              variant?: string;
            };
          }>;
        }
      | {
          __typename?: 'SectionTestimonial';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          testimonials?: Array<{
            __typename?: 'Testimonial';
            _key?: string;
            name?: string;
            role?: string;
            quote?: string;
            image?: {
              __typename?: 'Image';
              asset?: {
                __typename?: 'SanityImageAsset';
                _id?: string;
                url?: string;
                altText?: string;
                metadata?: {
                  __typename?: 'SanityImageMetadata';
                  lqip?: string;
                  dimensions?: {
                    __typename?: 'SanityImageDimensions';
                    width?: number;
                    height?: number;
                    aspectRatio?: number;
                  };
                };
              };
              hotspot?: {
                __typename?: 'SanityImageHotspot';
                x?: number;
                y?: number;
                height?: number;
                width?: number;
              };
              crop?: {
                __typename?: 'SanityImageCrop';
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
              };
            };
          }>;
        }
      | {
          __typename?: 'SectionTimeline';
          _id?: string;
          _type?: string;
          _key?: string;
          title?: string;
          displayTitle?: string;
          subtitle?: string;
          background?: string;
          maxWidth?: string;
          showBorder?: boolean;
          events?: Array<{
            __typename?: 'TimelineEvent';
            _key?: string;
            title?: string;
            date?: string;
            description?: string;
          }>;
        }
    >;
    slug?: { __typename?: 'Slug'; current?: string };
  }>;
};

export type GetGlobalDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetGlobalDataQuery = {
  __typename?: 'RootQuery';
  allNavigation: Array<{
    __typename?: 'Navigation';
    _id?: string;
    items?: Array<{
      __typename?: 'NavigationItem';
      _key?: string;
      label?: string;
      href?: string;
    }>;
  }>;
  allFooter: Array<{
    __typename?: 'Footer';
    _id?: string;
    copyright?: string;
    contact?: { __typename?: 'FooterContact'; email?: string; phone?: string };
    socialLinks?: Array<{
      __typename?: 'SocialLink';
      _key?: string;
      platform?: string;
      url?: string;
    }>;
  }>;
  allMenuFooter: Array<{
    __typename?: 'MenuFooter';
    _id?: string;
    about?: {
      __typename?: 'MenuFooterAbout';
      title?: string;
      description?: string;
    };
    social?: { __typename?: 'MenuFooterSocial'; title?: string };
    contact?: {
      __typename?: 'MenuFooterContact';
      title?: string;
      projectEnquiry?: {
        __typename?: 'MenuFooterEnquiry';
        label?: string;
        href?: string;
        linkText?: string;
      };
      generalEnquiry?: {
        __typename?: 'MenuFooterEnquiry';
        label?: string;
        href?: string;
        linkText?: string;
      };
    };
  }>;
};
