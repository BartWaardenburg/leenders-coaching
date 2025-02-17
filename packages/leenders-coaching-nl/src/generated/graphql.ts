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

export type Accessibility = {
  __typename?: 'Accessibility';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  calendar?: Maybe<CalendarNavigation>;
  closeButtons?: Maybe<CloseButtons>;
};

export type AccessibilityFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  calendar?: InputMaybe<CalendarNavigationFilter>;
  closeButtons?: InputMaybe<CloseButtonsFilter>;
};

export type AccessibilitySorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  calendar?: InputMaybe<CalendarNavigationSorting>;
  closeButtons?: InputMaybe<CloseButtonsSorting>;
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

export type Blog = {
  __typename?: 'Blog';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  labels?: Maybe<BlogLabels>;
  paths?: Maybe<BlogPaths>;
};

export type BlogFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  labels?: InputMaybe<BlogLabelsFilter>;
  paths?: InputMaybe<BlogPathsFilter>;
};

export type BlogLabels = {
  __typename?: 'BlogLabels';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['String']['output']>;
  readArticle?: Maybe<Scalars['String']['output']>;
};

export type BlogLabelsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  featured?: InputMaybe<StringFilter>;
  readArticle?: InputMaybe<StringFilter>;
};

export type BlogLabelsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  featured?: InputMaybe<SortOrder>;
  readArticle?: InputMaybe<SortOrder>;
};

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

export type BlogPaths = {
  __typename?: 'BlogPaths';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  blog?: Maybe<Scalars['String']['output']>;
};

export type BlogPathsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  blog?: InputMaybe<StringFilter>;
};

export type BlogPathsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  blog?: InputMaybe<SortOrder>;
};

export type BlogSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  labels?: InputMaybe<BlogLabelsSorting>;
  paths?: InputMaybe<BlogPathsSorting>;
};

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ButtonLabels = {
  __typename?: 'ButtonLabels';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  close?: Maybe<Scalars['String']['output']>;
  loadMore?: Maybe<Scalars['String']['output']>;
  readMore?: Maybe<Scalars['String']['output']>;
  submit?: Maybe<Scalars['String']['output']>;
};

export type ButtonLabelsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  close?: InputMaybe<StringFilter>;
  loadMore?: InputMaybe<StringFilter>;
  readMore?: InputMaybe<StringFilter>;
  submit?: InputMaybe<StringFilter>;
};

export type ButtonLabelsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  close?: InputMaybe<SortOrder>;
  loadMore?: InputMaybe<SortOrder>;
  readMore?: InputMaybe<SortOrder>;
  submit?: InputMaybe<SortOrder>;
};

export type CalendarNavigation = {
  __typename?: 'CalendarNavigation';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  nextMonth?: Maybe<Scalars['String']['output']>;
  previousMonth?: Maybe<Scalars['String']['output']>;
};

export type CalendarNavigationFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  nextMonth?: InputMaybe<StringFilter>;
  previousMonth?: InputMaybe<StringFilter>;
};

export type CalendarNavigationSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  nextMonth?: InputMaybe<SortOrder>;
  previousMonth?: InputMaybe<SortOrder>;
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

export type CloseButtons = {
  __typename?: 'CloseButtons';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  modal?: Maybe<Scalars['String']['output']>;
  toast?: Maybe<Scalars['String']['output']>;
};

export type CloseButtonsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  modal?: InputMaybe<StringFilter>;
  toast?: InputMaybe<StringFilter>;
};

export type CloseButtonsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  modal?: InputMaybe<SortOrder>;
  toast?: InputMaybe<SortOrder>;
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

export type Configuration = Document & {
  __typename?: 'Configuration';
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
  accessibility?: Maybe<Accessibility>;
  blog?: Maybe<Blog>;
  description?: Maybe<Scalars['String']['output']>;
  forms?: Maybe<Forms>;
  interface?: Maybe<UiInterface>;
  seo?: Maybe<Seo>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ConfigurationFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  accessibility?: InputMaybe<AccessibilityFilter>;
  blog?: InputMaybe<BlogFilter>;
  description?: InputMaybe<StringFilter>;
  forms?: InputMaybe<FormsFilter>;
  interface?: InputMaybe<UiInterfaceFilter>;
  seo?: InputMaybe<SeoFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ConfigurationSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  accessibility?: InputMaybe<AccessibilitySorting>;
  blog?: InputMaybe<BlogSorting>;
  description?: InputMaybe<SortOrder>;
  forms?: InputMaybe<FormsSorting>;
  interface?: InputMaybe<UiInterfaceSorting>;
  seo?: InputMaybe<SeoSorting>;
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
  /** Subject line for form submission emails */
  emailSubject?: Maybe<Scalars['String']['output']>;
  /** Email address to send form submissions to */
  emailTo?: Maybe<Scalars['String']['output']>;
  fields?: Maybe<Array<Maybe<FormField>>>;
};

export type FormConfigurationFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  emailSubject?: InputMaybe<StringFilter>;
  emailTo?: InputMaybe<StringFilter>;
};

export type FormConfigurationSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  emailSubject?: InputMaybe<SortOrder>;
  emailTo?: InputMaybe<SortOrder>;
};

export type FormField = {
  __typename?: 'FormField';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<Maybe<FormFieldOption>>>;
  placeholder?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type FormFieldFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  placeholder?: InputMaybe<StringFilter>;
  required?: InputMaybe<BooleanFilter>;
  type?: InputMaybe<StringFilter>;
};

export type FormFieldOption = {
  __typename?: 'FormFieldOption';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type FormFieldOptionFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type FormFieldOptionSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type FormFieldSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  placeholder?: InputMaybe<SortOrder>;
  required?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export type FormMessages = {
  __typename?: 'FormMessages';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  invalid?: Maybe<Scalars['String']['output']>;
  required?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['String']['output']>;
};

export type FormMessagesFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  error?: InputMaybe<StringFilter>;
  invalid?: InputMaybe<StringFilter>;
  required?: InputMaybe<StringFilter>;
  success?: InputMaybe<StringFilter>;
};

export type FormMessagesSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  error?: InputMaybe<SortOrder>;
  invalid?: InputMaybe<SortOrder>;
  required?: InputMaybe<SortOrder>;
  success?: InputMaybe<SortOrder>;
};

export type Forms = {
  __typename?: 'Forms';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<FormMessages>;
};

export type FormsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  messages?: InputMaybe<FormMessagesFilter>;
};

export type FormsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  messages?: InputMaybe<FormMessagesSorting>;
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

export type GoogleBot = {
  __typename?: 'GoogleBot';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Allow Google to follow links on this page */
  follow?: Maybe<Scalars['Boolean']['output']>;
  /** Allow Google to index this page */
  index?: Maybe<Scalars['Boolean']['output']>;
};

export type GoogleBotFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  follow?: InputMaybe<BooleanFilter>;
  index?: InputMaybe<BooleanFilter>;
};

export type GoogleBotSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  follow?: InputMaybe<SortOrder>;
  index?: InputMaybe<SortOrder>;
};

export type Header = Document & {
  __typename?: 'Header';
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
  about?: Maybe<HeaderAbout>;
  contact?: Maybe<HeaderContact>;
  navigation?: Maybe<Array<Maybe<NavigationItem>>>;
  social?: Maybe<HeaderSocial>;
};

export type HeaderAbout = {
  __typename?: 'HeaderAbout';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HeaderAboutFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HeaderAboutSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type HeaderContact = {
  __typename?: 'HeaderContact';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  generalEnquiry?: Maybe<HeaderEnquiry>;
  projectEnquiry?: Maybe<HeaderEnquiry>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HeaderContactFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  generalEnquiry?: InputMaybe<HeaderEnquiryFilter>;
  projectEnquiry?: InputMaybe<HeaderEnquiryFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HeaderContactSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  generalEnquiry?: InputMaybe<HeaderEnquirySorting>;
  projectEnquiry?: InputMaybe<HeaderEnquirySorting>;
  title?: InputMaybe<SortOrder>;
};

export type HeaderEnquiry = {
  __typename?: 'HeaderEnquiry';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  href?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  linkText?: Maybe<Scalars['String']['output']>;
};

export type HeaderEnquiryFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  href?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
  linkText?: InputMaybe<StringFilter>;
};

export type HeaderEnquirySorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  href?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
  linkText?: InputMaybe<SortOrder>;
};

export type HeaderFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<Sanity_DocumentFilter>;
  _createdAt?: InputMaybe<DatetimeFilter>;
  _id?: InputMaybe<IdFilter>;
  _key?: InputMaybe<StringFilter>;
  _rev?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  _updatedAt?: InputMaybe<DatetimeFilter>;
  about?: InputMaybe<HeaderAboutFilter>;
  contact?: InputMaybe<HeaderContactFilter>;
  social?: InputMaybe<HeaderSocialFilter>;
};

export type HeaderSocial = {
  __typename?: 'HeaderSocial';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type HeaderSocialFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type HeaderSocialSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
};

export type HeaderSorting = {
  _createdAt?: InputMaybe<SortOrder>;
  _id?: InputMaybe<SortOrder>;
  _key?: InputMaybe<SortOrder>;
  _rev?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  _updatedAt?: InputMaybe<SortOrder>;
  about?: InputMaybe<HeaderAboutSorting>;
  contact?: InputMaybe<HeaderContactSorting>;
  social?: InputMaybe<HeaderSocialSorting>;
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

export type Metadata = {
  __typename?: 'Metadata';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** A brief description of the page for search engines */
  description?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  openGraph?: Maybe<OpenGraph>;
  robots?: Maybe<Robots>;
  /** The title that appears in search engines and browser tabs */
  title?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Twitter>;
};

export type MetadataFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  openGraph?: InputMaybe<OpenGraphFilter>;
  robots?: InputMaybe<RobotsFilter>;
  title?: InputMaybe<StringFilter>;
  twitter?: InputMaybe<TwitterFilter>;
};

export type MetadataSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  openGraph?: InputMaybe<OpenGraphSorting>;
  robots?: InputMaybe<RobotsSorting>;
  title?: InputMaybe<SortOrder>;
  twitter?: InputMaybe<TwitterSorting>;
};

export type MobileMenu = {
  __typename?: 'MobileMenu';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  closeButton?: Maybe<Scalars['String']['output']>;
  menuLabel?: Maybe<Scalars['String']['output']>;
  toggleButton?: Maybe<Scalars['String']['output']>;
};

export type MobileMenuFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  closeButton?: InputMaybe<StringFilter>;
  menuLabel?: InputMaybe<StringFilter>;
  toggleButton?: InputMaybe<StringFilter>;
};

export type MobileMenuSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  closeButton?: InputMaybe<SortOrder>;
  menuLabel?: InputMaybe<SortOrder>;
  toggleButton?: InputMaybe<SortOrder>;
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

export type OpenGraph = {
  __typename?: 'OpenGraph';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Description for social media sharing */
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<OpenGraphImage>;
  /** The name of the website */
  siteName?: Maybe<Scalars['String']['output']>;
  /** Title for social media sharing */
  title?: Maybe<Scalars['String']['output']>;
  /** The type of content (e.g., website, article) */
  type?: Maybe<Scalars['String']['output']>;
  /** The canonical URL of the page */
  url?: Maybe<Scalars['String']['output']>;
};

export type OpenGraphFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  image?: InputMaybe<OpenGraphImageFilter>;
  siteName?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
};

export type OpenGraphImage = {
  __typename?: 'OpenGraphImage';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Alternative text for accessibility */
  alt?: Maybe<Scalars['String']['output']>;
  /** Height of the image in pixels */
  height?: Maybe<Scalars['Float']['output']>;
  url?: Maybe<Image>;
  /** Width of the image in pixels */
  width?: Maybe<Scalars['Float']['output']>;
};

export type OpenGraphImageFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alt?: InputMaybe<StringFilter>;
  height?: InputMaybe<FloatFilter>;
  url?: InputMaybe<ImageFilter>;
  width?: InputMaybe<FloatFilter>;
};

export type OpenGraphImageSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alt?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  url?: InputMaybe<ImageSorting>;
  width?: InputMaybe<SortOrder>;
};

export type OpenGraphSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  image?: InputMaybe<OpenGraphImageSorting>;
  siteName?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
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

export type Robots = {
  __typename?: 'Robots';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Allow search engines to follow links on this page */
  follow?: Maybe<Scalars['Boolean']['output']>;
  googleBot?: Maybe<GoogleBot>;
  /** Allow search engines to index this page */
  index?: Maybe<Scalars['Boolean']['output']>;
};

export type RobotsFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  follow?: InputMaybe<BooleanFilter>;
  googleBot?: InputMaybe<GoogleBotFilter>;
  index?: InputMaybe<BooleanFilter>;
};

export type RobotsSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  follow?: InputMaybe<SortOrder>;
  googleBot?: InputMaybe<GoogleBotSorting>;
  index?: InputMaybe<SortOrder>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  AboutPage?: Maybe<AboutPage>;
  ApproachPage?: Maybe<ApproachPage>;
  BlogPage?: Maybe<BlogPage>;
  CoachingPage?: Maybe<CoachingPage>;
  Configuration?: Maybe<Configuration>;
  ContactPage?: Maybe<ContactPage>;
  Document?: Maybe<Document>;
  Footer?: Maybe<Footer>;
  Header?: Maybe<Header>;
  HomePage?: Maybe<HomePage>;
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
  allAboutPage: Array<AboutPage>;
  allApproachPage: Array<ApproachPage>;
  allBlogPage: Array<BlogPage>;
  allCoachingPage: Array<CoachingPage>;
  allConfiguration: Array<Configuration>;
  allContactPage: Array<ContactPage>;
  allDocument: Array<Document>;
  allFooter: Array<Footer>;
  allHeader: Array<Header>;
  allHomePage: Array<HomePage>;
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

export type RootQueryConfigurationArgs = {
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

export type RootQueryHeaderArgs = {
  id: Scalars['ID']['input'];
};

export type RootQueryHomePageArgs = {
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

export type RootQueryAllConfigurationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ConfigurationSorting>>;
  where?: InputMaybe<ConfigurationFilter>;
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

export type RootQueryAllHeaderArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HeaderSorting>>;
  where?: InputMaybe<HeaderFilter>;
};

export type RootQueryAllHomePageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<HomePageSorting>>;
  where?: InputMaybe<HomePageFilter>;
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

export type Seo = {
  __typename?: 'Seo';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  defaultMetaImage?: Maybe<Image>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type SeoFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  defaultMetaImage?: InputMaybe<ImageFilter>;
};

export type SeoSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  defaultMetaImage?: InputMaybe<ImageSorting>;
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

export type ThemeToggle = {
  __typename?: 'ThemeToggle';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
};

export type ThemeToggleFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  label?: InputMaybe<StringFilter>;
};

export type ThemeToggleSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  label?: InputMaybe<SortOrder>;
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

export type Twitter = {
  __typename?: 'Twitter';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  card?: Maybe<Scalars['String']['output']>;
  /** @username of content creator */
  creator?: Maybe<Scalars['String']['output']>;
  image?: Maybe<TwitterImage>;
  /** @username of website */
  site?: Maybe<Scalars['String']['output']>;
};

export type TwitterFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  card?: InputMaybe<StringFilter>;
  creator?: InputMaybe<StringFilter>;
  image?: InputMaybe<TwitterImageFilter>;
  site?: InputMaybe<StringFilter>;
};

export type TwitterImage = {
  __typename?: 'TwitterImage';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  /** Alternative text for accessibility */
  alt?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Image>;
};

export type TwitterImageFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  alt?: InputMaybe<StringFilter>;
  url?: InputMaybe<ImageFilter>;
};

export type TwitterImageSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  alt?: InputMaybe<SortOrder>;
  url?: InputMaybe<ImageSorting>;
};

export type TwitterSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  card?: InputMaybe<SortOrder>;
  creator?: InputMaybe<SortOrder>;
  image?: InputMaybe<TwitterImageSorting>;
  site?: InputMaybe<SortOrder>;
};

export type UiInterface = {
  __typename?: 'UiInterface';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  buttons?: Maybe<ButtonLabels>;
  mobileMenu?: Maybe<MobileMenu>;
  themeToggle?: Maybe<ThemeToggle>;
};

export type UiInterfaceFilter = {
  _key?: InputMaybe<StringFilter>;
  _type?: InputMaybe<StringFilter>;
  buttons?: InputMaybe<ButtonLabelsFilter>;
  mobileMenu?: InputMaybe<MobileMenuFilter>;
  themeToggle?: InputMaybe<ThemeToggleFilter>;
};

export type UiInterfaceSorting = {
  _key?: InputMaybe<SortOrder>;
  _type?: InputMaybe<SortOrder>;
  buttons?: InputMaybe<ButtonLabelsSorting>;
  mobileMenu?: InputMaybe<MobileMenuSorting>;
  themeToggle?: InputMaybe<ThemeToggleSorting>;
};

export type AriaFieldsFragment = {
  __typename?: 'Accessibility';
  closeButtons?: {
    __typename?: 'CloseButtons';
    toast?: string;
    modal?: string;
  };
  calendar?: {
    __typename?: 'CalendarNavigation';
    previousMonth?: string;
    nextMonth?: string;
  };
};

export type ConfigurationFieldsFragment = {
  __typename?: 'Configuration';
  _id?: string;
  _type?: string;
  title?: string;
  description?: string;
  seo?: {
    __typename?: 'Seo';
    keywords?: Array<string>;
    defaultMetaImage?: {
      __typename?: 'Image';
      asset?: {
        __typename?: 'SanityImageAsset';
        url?: string;
        altText?: string;
      };
      hotspot?: { __typename?: 'SanityImageHotspot'; x?: number; y?: number };
    };
  };
  accessibility?: {
    __typename?: 'Accessibility';
    closeButtons?: {
      __typename?: 'CloseButtons';
      toast?: string;
      modal?: string;
    };
    calendar?: {
      __typename?: 'CalendarNavigation';
      previousMonth?: string;
      nextMonth?: string;
    };
  };
  interface?: {
    __typename?: 'UiInterface';
    mobileMenu?: {
      __typename?: 'MobileMenu';
      toggleButton?: string;
      menuLabel?: string;
      closeButton?: string;
    };
    themeToggle?: { __typename?: 'ThemeToggle'; label?: string };
    buttons?: {
      __typename?: 'ButtonLabels';
      loadMore?: string;
      readMore?: string;
      submit?: string;
      close?: string;
    };
  };
  blog?: {
    __typename?: 'Blog';
    labels?: {
      __typename?: 'BlogLabels';
      featured?: string;
      readArticle?: string;
    };
    paths?: { __typename?: 'BlogPaths'; blog?: string };
  };
  forms?: {
    __typename?: 'Forms';
    messages?: {
      __typename?: 'FormMessages';
      required?: string;
      invalid?: string;
      success?: string;
      error?: string;
    };
  };
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

export type HeaderFieldsFragment = {
  __typename?: 'Header';
  navigation?: Array<{
    __typename?: 'NavigationItem';
    _key?: string;
    label?: string;
    href?: string;
  }>;
  about?: { __typename?: 'HeaderAbout'; title?: string; description?: string };
  social?: { __typename?: 'HeaderSocial'; title?: string };
  contact?: {
    __typename?: 'HeaderContact';
    title?: string;
    projectEnquiry?: {
      __typename?: 'HeaderEnquiry';
      label?: string;
      href?: string;
      linkText?: string;
    };
    generalEnquiry?: {
      __typename?: 'HeaderEnquiry';
      label?: string;
      href?: string;
      linkText?: string;
    };
  };
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

export type MetadataFieldsFragment = {
  __typename?: 'Metadata';
  title?: string;
  description?: string;
  keywords?: Array<string>;
  openGraph?: {
    __typename?: 'OpenGraph';
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    siteName?: string;
    image?: {
      __typename?: 'OpenGraphImage';
      width?: number;
      height?: number;
      alt?: string;
      url?: {
        __typename?: 'Image';
        asset?: { __typename?: 'SanityImageAsset'; url?: string };
        hotspot?: { __typename?: 'SanityImageHotspot'; x?: number; y?: number };
      };
    };
  };
  twitter?: {
    __typename?: 'Twitter';
    card?: string;
    site?: string;
    creator?: string;
    image?: {
      __typename?: 'TwitterImage';
      alt?: string;
      url?: {
        __typename?: 'Image';
        asset?: { __typename?: 'SanityImageAsset'; url?: string };
        hotspot?: { __typename?: 'SanityImageHotspot'; x?: number; y?: number };
      };
    };
  };
  robots?: {
    __typename?: 'Robots';
    index?: boolean;
    follow?: boolean;
    googleBot?: { __typename?: 'GoogleBot'; index?: boolean; follow?: boolean };
  };
};

type PageFields_AboutPage_Fragment = {
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_ApproachPage_Fragment = {
  __typename?: 'ApproachPage';
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_BlogPage_Fragment = {
  __typename?: 'BlogPage';
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_CoachingPage_Fragment = {
  __typename?: 'CoachingPage';
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_Configuration_Fragment = {
  __typename?: 'Configuration';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_ContactPage_Fragment = {
  __typename?: 'ContactPage';
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_Footer_Fragment = {
  __typename?: 'Footer';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_Header_Fragment = {
  __typename?: 'Header';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_HomePage_Fragment = {
  __typename?: 'HomePage';
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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type PageFields_Post_Fragment = {
  __typename?: 'Post';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SanityFileAsset_Fragment = {
  __typename?: 'SanityFileAsset';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SanityImageAsset_Fragment = {
  __typename?: 'SanityImageAsset';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionBlog_Fragment = {
  __typename?: 'SectionBlog';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionCalendar_Fragment = {
  __typename?: 'SectionCalendar';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionCards_Fragment = {
  __typename?: 'SectionCards';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionContent_Fragment = {
  __typename?: 'SectionContent';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionFaq_Fragment = {
  __typename?: 'SectionFAQ';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionFeatured_Fragment = {
  __typename?: 'SectionFeatured';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionForm_Fragment = {
  __typename?: 'SectionForm';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionHeader_Fragment = {
  __typename?: 'SectionHeader';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionPricing_Fragment = {
  __typename?: 'SectionPricing';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionTestimonial_Fragment = {
  __typename?: 'SectionTestimonial';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

type PageFields_SectionTimeline_Fragment = {
  __typename?: 'SectionTimeline';
  _id?: string;
  _createdAt?: any;
  _updatedAt?: any;
  _rev?: string;
  _type?: string;
};

export type PageFieldsFragment =
  | PageFields_AboutPage_Fragment
  | PageFields_ApproachPage_Fragment
  | PageFields_BlogPage_Fragment
  | PageFields_CoachingPage_Fragment
  | PageFields_Configuration_Fragment
  | PageFields_ContactPage_Fragment
  | PageFields_Footer_Fragment
  | PageFields_Header_Fragment
  | PageFields_HomePage_Fragment
  | PageFields_Post_Fragment
  | PageFields_SanityFileAsset_Fragment
  | PageFields_SanityImageAsset_Fragment
  | PageFields_SectionBlog_Fragment
  | PageFields_SectionCalendar_Fragment
  | PageFields_SectionCards_Fragment
  | PageFields_SectionContent_Fragment
  | PageFields_SectionFaq_Fragment
  | PageFields_SectionFeatured_Fragment
  | PageFields_SectionForm_Fragment
  | PageFields_SectionHeader_Fragment
  | PageFields_SectionPricing_Fragment
  | PageFields_SectionTestimonial_Fragment
  | PageFields_SectionTimeline_Fragment;

type CommonPageContent_AboutPage_Fragment = {
  __typename?: 'AboutPage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_ApproachPage_Fragment = {
  __typename?: 'ApproachPage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_BlogPage_Fragment = {
  __typename?: 'BlogPage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_CoachingPage_Fragment = {
  __typename?: 'CoachingPage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_Configuration_Fragment = {
  __typename?: 'Configuration';
};

type CommonPageContent_ContactPage_Fragment = {
  __typename?: 'ContactPage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_Footer_Fragment = { __typename?: 'Footer' };

type CommonPageContent_Header_Fragment = { __typename?: 'Header' };

type CommonPageContent_HomePage_Fragment = {
  __typename?: 'HomePage';
  title?: string;
  metadata?: {
    __typename?: 'Metadata';
    title?: string;
    description?: string;
    keywords?: Array<string>;
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
      };
    };
  };
  sections?: Array<
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
        title?: string;
        displayTitle?: string;
        subtitle?: string;
        background?: string;
        maxWidth?: string;
        showBorder?: boolean;
        form?: {
          __typename?: 'FormConfiguration';
          emailTo?: string;
          emailSubject?: string;
          fields?: Array<{
            __typename?: 'FormField';
            _key?: string;
            label?: string;
            type?: string;
            required?: boolean;
            placeholder?: string;
            options?: Array<{
              __typename?: 'FormFieldOption';
              _key?: string;
              label?: string;
              value?: string;
            }>;
          }>;
        };
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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
        _key?: string;
        _type?: string;
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

type CommonPageContent_Post_Fragment = { __typename?: 'Post' };

type CommonPageContent_SanityFileAsset_Fragment = {
  __typename?: 'SanityFileAsset';
};

type CommonPageContent_SanityImageAsset_Fragment = {
  __typename?: 'SanityImageAsset';
};

type CommonPageContent_SectionBlog_Fragment = { __typename?: 'SectionBlog' };

type CommonPageContent_SectionCalendar_Fragment = {
  __typename?: 'SectionCalendar';
};

type CommonPageContent_SectionCards_Fragment = { __typename?: 'SectionCards' };

type CommonPageContent_SectionContent_Fragment = {
  __typename?: 'SectionContent';
};

type CommonPageContent_SectionFaq_Fragment = { __typename?: 'SectionFAQ' };

type CommonPageContent_SectionFeatured_Fragment = {
  __typename?: 'SectionFeatured';
};

type CommonPageContent_SectionForm_Fragment = { __typename?: 'SectionForm' };

type CommonPageContent_SectionHeader_Fragment = {
  __typename?: 'SectionHeader';
};

type CommonPageContent_SectionPricing_Fragment = {
  __typename?: 'SectionPricing';
};

type CommonPageContent_SectionTestimonial_Fragment = {
  __typename?: 'SectionTestimonial';
};

type CommonPageContent_SectionTimeline_Fragment = {
  __typename?: 'SectionTimeline';
};

export type CommonPageContentFragment =
  | CommonPageContent_AboutPage_Fragment
  | CommonPageContent_ApproachPage_Fragment
  | CommonPageContent_BlogPage_Fragment
  | CommonPageContent_CoachingPage_Fragment
  | CommonPageContent_Configuration_Fragment
  | CommonPageContent_ContactPage_Fragment
  | CommonPageContent_Footer_Fragment
  | CommonPageContent_Header_Fragment
  | CommonPageContent_HomePage_Fragment
  | CommonPageContent_Post_Fragment
  | CommonPageContent_SanityFileAsset_Fragment
  | CommonPageContent_SanityImageAsset_Fragment
  | CommonPageContent_SectionBlog_Fragment
  | CommonPageContent_SectionCalendar_Fragment
  | CommonPageContent_SectionCards_Fragment
  | CommonPageContent_SectionContent_Fragment
  | CommonPageContent_SectionFaq_Fragment
  | CommonPageContent_SectionFeatured_Fragment
  | CommonPageContent_SectionForm_Fragment
  | CommonPageContent_SectionHeader_Fragment
  | CommonPageContent_SectionPricing_Fragment
  | CommonPageContent_SectionTestimonial_Fragment
  | CommonPageContent_SectionTimeline_Fragment;

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
    openGraph?: {
      __typename?: 'OpenGraph';
      title?: string;
      description?: string;
      type?: string;
      url?: string;
      siteName?: string;
      image?: {
        __typename?: 'OpenGraphImage';
        width?: number;
        height?: number;
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    twitter?: {
      __typename?: 'Twitter';
      card?: string;
      site?: string;
      creator?: string;
      image?: {
        __typename?: 'TwitterImage';
        alt?: string;
        url?: {
          __typename?: 'Image';
          asset?: { __typename?: 'SanityImageAsset'; url?: string };
          hotspot?: {
            __typename?: 'SanityImageHotspot';
            x?: number;
            y?: number;
          };
        };
      };
    };
    robots?: {
      __typename?: 'Robots';
      index?: boolean;
      follow?: boolean;
      googleBot?: {
        __typename?: 'GoogleBot';
        index?: boolean;
        follow?: boolean;
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

type CommonSectionFields_SectionBlog_Fragment = {
  __typename?: 'SectionBlog';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionCalendar_Fragment = {
  __typename?: 'SectionCalendar';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionCards_Fragment = {
  __typename?: 'SectionCards';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionContent_Fragment = {
  __typename?: 'SectionContent';
  _id?: string;
  _key?: string;
  _type?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  contentRaw?: any;
};

type CommonSectionFields_SectionFaq_Fragment = {
  __typename?: 'SectionFAQ';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionFeatured_Fragment = {
  __typename?: 'SectionFeatured';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionForm_Fragment = {
  __typename?: 'SectionForm';
  _id?: string;
  _key?: string;
  _type?: string;
  title?: string;
  displayTitle?: string;
  subtitle?: string;
  background?: string;
  maxWidth?: string;
  showBorder?: boolean;
  form?: {
    __typename?: 'FormConfiguration';
    emailTo?: string;
    emailSubject?: string;
    fields?: Array<{
      __typename?: 'FormField';
      _key?: string;
      label?: string;
      type?: string;
      required?: boolean;
      placeholder?: string;
      options?: Array<{
        __typename?: 'FormFieldOption';
        _key?: string;
        label?: string;
        value?: string;
      }>;
    }>;
  };
};

type CommonSectionFields_SectionHeader_Fragment = {
  __typename?: 'SectionHeader';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionPricing_Fragment = {
  __typename?: 'SectionPricing';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionTestimonial_Fragment = {
  __typename?: 'SectionTestimonial';
  _id?: string;
  _key?: string;
  _type?: string;
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

type CommonSectionFields_SectionTimeline_Fragment = {
  __typename?: 'SectionTimeline';
  _id?: string;
  _key?: string;
  _type?: string;
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

export type CommonSectionFieldsFragment =
  | CommonSectionFields_SectionBlog_Fragment
  | CommonSectionFields_SectionCalendar_Fragment
  | CommonSectionFields_SectionCards_Fragment
  | CommonSectionFields_SectionContent_Fragment
  | CommonSectionFields_SectionFaq_Fragment
  | CommonSectionFields_SectionFeatured_Fragment
  | CommonSectionFields_SectionForm_Fragment
  | CommonSectionFields_SectionHeader_Fragment
  | CommonSectionFields_SectionPricing_Fragment
  | CommonSectionFields_SectionTestimonial_Fragment
  | CommonSectionFields_SectionTimeline_Fragment;

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
    emailTo?: string;
    emailSubject?: string;
    fields?: Array<{
      __typename?: 'FormField';
      _key?: string;
      label?: string;
      type?: string;
      required?: boolean;
      placeholder?: string;
      options?: Array<{
        __typename?: 'FormFieldOption';
        _key?: string;
        label?: string;
        value?: string;
      }>;
    }>;
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

export type GetGlobalDataQueryVariables = Exact<{ [key: string]: never }>;

export type GetGlobalDataQuery = {
  __typename?: 'RootQuery';
  allHeader: Array<{
    __typename?: 'Header';
    navigation?: Array<{
      __typename?: 'NavigationItem';
      _key?: string;
      label?: string;
      href?: string;
    }>;
    about?: {
      __typename?: 'HeaderAbout';
      title?: string;
      description?: string;
    };
    social?: { __typename?: 'HeaderSocial'; title?: string };
    contact?: {
      __typename?: 'HeaderContact';
      title?: string;
      projectEnquiry?: {
        __typename?: 'HeaderEnquiry';
        label?: string;
        href?: string;
        linkText?: string;
      };
      generalEnquiry?: {
        __typename?: 'HeaderEnquiry';
        label?: string;
        href?: string;
        linkText?: string;
      };
    };
  }>;
  allFooter: Array<{
    __typename?: 'Footer';
    copyright?: string;
    contact?: { __typename?: 'FooterContact'; email?: string; phone?: string };
    socialLinks?: Array<{
      __typename?: 'SocialLink';
      _key?: string;
      platform?: string;
      url?: string;
    }>;
  }>;
  allConfiguration: Array<{
    __typename?: 'Configuration';
    _id?: string;
    _type?: string;
    title?: string;
    description?: string;
    seo?: {
      __typename?: 'Seo';
      keywords?: Array<string>;
      defaultMetaImage?: {
        __typename?: 'Image';
        asset?: {
          __typename?: 'SanityImageAsset';
          url?: string;
          altText?: string;
        };
        hotspot?: { __typename?: 'SanityImageHotspot'; x?: number; y?: number };
      };
    };
    accessibility?: {
      __typename?: 'Accessibility';
      closeButtons?: {
        __typename?: 'CloseButtons';
        toast?: string;
        modal?: string;
      };
      calendar?: {
        __typename?: 'CalendarNavigation';
        previousMonth?: string;
        nextMonth?: string;
      };
    };
    interface?: {
      __typename?: 'UiInterface';
      mobileMenu?: {
        __typename?: 'MobileMenu';
        toggleButton?: string;
        menuLabel?: string;
        closeButton?: string;
      };
      themeToggle?: { __typename?: 'ThemeToggle'; label?: string };
      buttons?: {
        __typename?: 'ButtonLabels';
        loadMore?: string;
        readMore?: string;
        submit?: string;
        close?: string;
      };
    };
    blog?: {
      __typename?: 'Blog';
      labels?: {
        __typename?: 'BlogLabels';
        featured?: string;
        readArticle?: string;
      };
      paths?: { __typename?: 'BlogPaths'; blog?: string };
    };
    forms?: {
      __typename?: 'Forms';
      messages?: {
        __typename?: 'FormMessages';
        required?: string;
        invalid?: string;
        success?: string;
        error?: string;
      };
    };
  }>;
};

export type GetPageQueryVariables = Exact<{
  type: Scalars['String']['input'];
}>;

export type GetPageQuery = {
  __typename?: 'RootQuery';
  allDocument: Array<
    | {
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'ApproachPage';
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'BlogPage';
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'CoachingPage';
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'Configuration';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'ContactPage';
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'Footer';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'Header';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'HomePage';
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
          openGraph?: {
            __typename?: 'OpenGraph';
            title?: string;
            description?: string;
            type?: string;
            url?: string;
            siteName?: string;
            image?: {
              __typename?: 'OpenGraphImage';
              width?: number;
              height?: number;
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          twitter?: {
            __typename?: 'Twitter';
            card?: string;
            site?: string;
            creator?: string;
            image?: {
              __typename?: 'TwitterImage';
              alt?: string;
              url?: {
                __typename?: 'Image';
                asset?: { __typename?: 'SanityImageAsset'; url?: string };
                hotspot?: {
                  __typename?: 'SanityImageHotspot';
                  x?: number;
                  y?: number;
                };
              };
            };
          };
          robots?: {
            __typename?: 'Robots';
            index?: boolean;
            follow?: boolean;
            googleBot?: {
              __typename?: 'GoogleBot';
              index?: boolean;
              follow?: boolean;
            };
          };
        };
        sections?: Array<
          | {
              __typename?: 'SectionBlog';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
              title?: string;
              displayTitle?: string;
              subtitle?: string;
              background?: string;
              maxWidth?: string;
              showBorder?: boolean;
              form?: {
                __typename?: 'FormConfiguration';
                emailTo?: string;
                emailSubject?: string;
                fields?: Array<{
                  __typename?: 'FormField';
                  _key?: string;
                  label?: string;
                  type?: string;
                  required?: boolean;
                  placeholder?: string;
                  options?: Array<{
                    __typename?: 'FormFieldOption';
                    _key?: string;
                    label?: string;
                    value?: string;
                  }>;
                }>;
              };
            }
          | {
              __typename?: 'SectionHeader';
              _id?: string;
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
              _key?: string;
              _type?: string;
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
      }
    | {
        __typename?: 'Post';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SanityFileAsset';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SanityImageAsset';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionBlog';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionCalendar';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionCards';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionContent';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionFAQ';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionFeatured';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionForm';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionHeader';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionPricing';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionTestimonial';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
    | {
        __typename?: 'SectionTimeline';
        _id?: string;
        _createdAt?: any;
        _updatedAt?: any;
        _rev?: string;
        _type?: string;
      }
  >;
};
