import { defineType } from 'sanity';

/* Call to Action Object */
export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    { name: 'text', type: 'string', title: 'Button Text' },
    { name: 'link', type: 'string', title: 'Button Link' },
    {
      name: 'variant',
      type: 'string',
      title: 'Button Variant',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Text', value: 'text' },
        ],
      },
    },
  ],
});

/* Link Object */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    { name: 'text', type: 'string', title: 'Link Text' },
    { name: 'url', type: 'string', title: 'URL' },
  ],
});

/* Feature Item Object */
export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
});

/* Pricing Card Object */
export const pricingCard = defineType({
  name: 'pricingCard',
  title: 'Pricing Card',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'price', type: 'string', title: 'Price' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'features',
      type: 'array',
      title: 'Features',
      of: [{ type: 'string' }],
    },
    {
      name: 'isPopular',
      type: 'boolean',
      title: 'Is Popular Package',
      initialValue: false,
    },
    {
      name: 'variant',
      type: 'string',
      title: 'Color Variant',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Green', value: 'green' },
          { title: 'Pink', value: 'pink' },
          { title: 'Yellow', value: 'yellow' },
          { title: 'Teal', value: 'teal' },
        ],
      },
    },
    { name: 'cta', type: 'callToAction', title: 'Call to Action' },
  ],
});

/* FAQ Item Object */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    { name: 'question', type: 'string', title: 'Question' },
    { name: 'answer', type: 'text', title: 'Answer' },
  ],
});

/* Timeline Event Object */
export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'date', type: 'string', title: 'Date' },
    { name: 'description', type: 'text', title: 'Description' },
  ],
});

/* Form Field Object */
export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Label' },
    {
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
        ],
      },
    },
    { name: 'required', type: 'boolean', title: 'Required' },
  ],
});

/* Card Object */
export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'description', type: 'text', title: 'Description' },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'link', type: 'link', title: 'Link' },
  ],
});

/* Testimonial Object */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    { name: 'quote', type: 'text', title: 'Quote' },
    { name: 'name', type: 'string', title: 'Author Name' },
    { name: 'role', type: 'string', title: 'Author Role/Title' },
    {
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
});

/* Time Slot Object */
export const timeSlot = defineType({
  name: 'timeSlot',
  title: 'Time Slot',
  type: 'object',
  fields: [
    { name: 'startTime', type: 'string', title: 'Start Time' },
    { name: 'endTime', type: 'string', title: 'End Time' },
  ],
});

/* Calendar Settings Object */
export const calendarSettings = defineType({
  name: 'calendarSettings',
  title: 'Calendar Settings',
  type: 'object',
  fields: [
    {
      name: 'availableDays',
      title: 'Available Days',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
    },
    {
      name: 'availableTimeSlots',
      title: 'Available Time Slots',
      type: 'array',
      of: [{ type: 'timeSlot' }],
    },
    {
      name: 'excludedDates',
      title: 'Excluded Dates',
      type: 'array',
      of: [{ type: 'date' }],
    },
  ],
});

/* Form Configuration Object */
export const formConfiguration = defineType({
  name: 'formConfiguration',
  title: 'Form Configuration',
  type: 'object',
  fields: [
    {
      name: 'submitLabel',
      type: 'string',
      title: 'Submit Button Label',
      initialValue: 'Verstuur bericht',
    },
    {
      name: 'successMessage',
      type: 'text',
      title: 'Success Message',
      initialValue:
        'Bedankt voor je bericht. Ik neem zo snel mogelijk contact met je op.',
    },
    {
      name: 'errorMessage',
      type: 'text',
      title: 'Error Message',
      initialValue:
        'Er is iets misgegaan. Probeer het later opnieuw of neem contact op via email.',
    },
    {
      name: 'emailTo',
      type: 'string',
      title: 'Email To',
      validation: (rule) => rule.email(),
      initialValue: 'info@leenderscoaching.nl',
    },
    {
      name: 'emailSubject',
      type: 'string',
      title: 'Email Subject',
      initialValue: 'Nieuw contactformulier bericht',
    },
  ],
});
