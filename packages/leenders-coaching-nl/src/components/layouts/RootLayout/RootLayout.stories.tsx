import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionBlog } from '@/components/sections/SectionBlog';
import { SectionCalendar } from '@/components/sections/SectionCalendar';
import { SectionCards } from '@/components/sections/SectionCards';
import { SectionContent } from '@/components/sections/SectionContent';
import { SectionFAQ } from '@/components/sections/SectionFAQ';
import { SectionFeatured } from '@/components/sections/SectionFeatured';
import { SectionForm } from '@/components/sections/SectionForm';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { SectionPricing } from '@/components/sections/SectionPricing';
import { SectionTestimonial } from '@/components/sections/SectionTestimonial';
import { SectionTimeline } from '@/components/sections/SectionTimeline';
import { Card } from '@/components/ui/Card';
import {
  mockHeaderSection,
  mockContentSection,
  mockTestimonialSection,
  mockPricingSection,
  mockTimelineSection,
  mockBlogSection,
  mockFAQSection,
  mockFeaturedSection,
  mockCalendarSection,
  mockFormSection,
  mockButtonVariants,
  mockSanityBlock,
  mockCardData,
} from '@/mocks';

const meta = {
  title: 'Layouts/RootLayout',
  component: () => null,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/* Mock content for sections - using centralized mocks */
const mockContent = {
  header: {
    title: mockHeaderSection.displayTitle,
    description: mockHeaderSection.description,
    ctas: [mockButtonVariants.primary, mockButtonVariants.secondary],
  },
  content: mockContentSection.content,
  longContent: mockSanityBlock.multiple,
  testimonials: mockTestimonialSection.testimonials,
  extendedTestimonials: mockTestimonialSection.testimonials,
  faq: mockFAQSection.faqs,
  pricing: mockPricingSection.packages,
};

export const AllSections: Story = {
  render: () => (
    <>
      <SectionHeader
        title={mockContent.header.title}
        description={mockContent.header.description}
        ctas={mockContent.header.ctas}
        background="blue"
      />
      <SectionContent
        title={mockContentSection.displayTitle}
        content={mockContent.content}
      />
      <SectionContent
        title="Onze Uitgebreide Aanpak"
        content={mockContent.longContent}
        background="yellow"
      />
      <SectionCards
        title="Onze Diensten"
        description="Uitgebreide coaching oplossingen voor jouw groei"
      >
        <Card title={mockCardData.service.title} variant="blue" border>
          <p>{mockCardData.service.description}</p>
        </Card>
        <Card
          title={mockCardData.personalCoaching.title}
          variant="purple"
          border
        >
          <p>{mockCardData.personalCoaching.description}</p>
        </Card>
        <Card title={mockCardData.businessCoaching.title} variant="teal" border>
          <p>{mockCardData.businessCoaching.description}</p>
        </Card>
        <Card title={mockCardData.teamCoaching.title} variant="green" border>
          <p>{mockCardData.teamCoaching.description}</p>
        </Card>
      </SectionCards>
      <SectionFeatured
        title={mockFeaturedSection.displayTitle}
        description={mockFeaturedSection.description}
        image={mockFeaturedSection.image}
        cta={mockFeaturedSection.cta}
        background="yellow"
      />
      <SectionTimeline
        title={mockTimelineSection.displayTitle}
        description={mockTimelineSection.description}
        steps={mockTimelineSection.steps}
        background="purple"
      />
      <SectionTestimonial
        title={mockTestimonialSection.displayTitle}
        description={mockTestimonialSection.description}
        testimonials={mockContent.testimonials}
        background="green"
      />
      <SectionTestimonial
        title="Transformatie Reis"
        description="Uitgebreide ervaringen van onze langetermijnklanten"
        testimonials={mockContent.extendedTestimonials}
        background="blue"
      />
      <SectionPricing
        title={mockPricingSection.displayTitle}
        description={mockPricingSection.description}
        packages={mockContent.pricing}
      />
      <SectionBlog
        title={mockBlogSection.displayTitle}
        description={mockBlogSection.description}
        posts={mockBlogSection.posts}
      />
      <SectionFAQ
        title={mockFAQSection.displayTitle}
        description={mockFAQSection.description}
        items={mockContent.faq}
        background="purple"
      />
      <SectionForm
        title={mockFormSection.displayTitle}
        description={mockFormSection.description}
        background="blue"
        form={mockFormSection.form}
      />
      <SectionCalendar
        title={mockCalendarSection.displayTitle}
        description={mockCalendarSection.description}
      />
    </>
  ),
};
