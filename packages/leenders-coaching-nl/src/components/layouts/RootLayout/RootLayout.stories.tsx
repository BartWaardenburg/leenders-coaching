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

const meta = {
  title: 'Layouts/RootLayout',
  component: () => null, // This is a layout story without a specific component
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/* Mock content for sections */
const mockContent = {
  header: {
    title: 'Welcome to Leenders Coaching',
    description: 'Helping you achieve your personal and professional goals',
    primaryCta: {
      label: 'Book a Session',
      href: '/contact',
      variant: 'blue' as const,
    },
    secondaryCta: {
      label: 'Learn More',
      href: '/about',
      variant: 'transparent' as const,
    },
  },
  content: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'We offer professional coaching services to help you reach your full potential.',
        },
      ],
    },
  ],
  longContent: [
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'At Leenders Coaching, we believe in the transformative power of professional coaching. Our comprehensive approach combines years of experience with cutting-edge methodologies to help you unlock your true potential. Whether you are seeking personal growth, professional development, or both, our dedicated team is here to support your journey.',
        },
      ],
    },
    {
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: 'We understand that every individuals path is unique, which is why we offer personalized coaching programs tailored to your specific needs and goals. Our proven track record of success spans across various industries and life situations, making us your ideal partner in achieving lasting positive change.',
        },
      ],
    },
  ],
  testimonials: [
    {
      quote:
        "The coaching sessions have been transformative for my career. I've gained clarity and confidence.",
      name: 'John Doe',
      role: 'Marketing Manager',
      image: 'https://picsum.photos/id/1027/150/150',
    },
    {
      quote:
        'Working with Leenders Coaching has helped me achieve my goals faster than I thought possible.',
      name: 'Jane Smith',
      role: 'Entrepreneur',
      image: 'https://picsum.photos/id/64/150/150',
    },
    {
      quote:
        'The insights and strategies I gained have completely transformed my approach to leadership.',
      name: 'Michael Johnson',
      role: 'CEO',
      image: 'https://picsum.photos/id/1025/150/150',
    },
  ],
  extendedTestimonials: [
    {
      quote:
        'My journey with Leenders Coaching began during a crucial career transition. The depth of understanding and personalized guidance I received was exceptional. Through our sessions, I not only achieved my immediate goals but also developed a long-term vision for my professional growth.',
      name: 'Sarah Williams',
      role: 'Senior Product Manager',
      image: 'https://picsum.photos/id/1025/150/150',
    },
    {
      quote:
        'The holistic approach to coaching at Leenders has been eye-opening. We worked on both professional challenges and personal development, creating a perfect balance that led to sustainable growth in all areas of my life.',
      name: 'Robert Chen',
      role: 'Tech Entrepreneur',
      image: 'https://picsum.photos/id/1027/150/150',
    },
  ],
  faq: [
    {
      question: 'How long are the coaching sessions?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Our coaching sessions typically last 60 minutes.',
            },
          ],
          style: 'normal',
          _key: '1',
        },
      ],
    },
    {
      question: 'What is your coaching approach?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'We use a personalized, goal-oriented approach tailored to your specific needs.',
            },
          ],
          style: 'normal',
          _key: '2',
        },
      ],
    },
    {
      question: 'How many sessions do you recommend?',
      answer: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'While every clients needs are different, we typically recommend a minimum of 6-8 sessions to see meaningful progress and sustainable results. This allows us to work through your goals systematically while building momentum and implementing lasting changes.',
            },
          ],
          style: 'normal',
          _key: '3',
        },
      ],
    },
  ],
  pricing: [
    {
      title: 'Starter Package',
      description: 'Perfect for those just starting their journey',
      price: '€99',
      features: [
        { text: '1 coaching session' },
        { text: 'Email support' },
        { text: 'Goal setting workshop' },
      ],
      ctaLabel: 'Get Started',
      variant: 'blue' as const,
    },
    {
      title: 'Professional Package',
      description: 'For dedicated personal growth',
      price: '€249',
      features: [
        { text: '3 coaching sessions' },
        { text: 'Priority email support' },
        { text: 'Personalized action plan' },
      ],
      isPopular: true,
      ctaLabel: 'Choose Pro',
      variant: 'purple' as const,
    },
    {
      title: 'Executive Package',
      description: 'Comprehensive support for leaders',
      price: '€499',
      features: [
        { text: '6 coaching sessions' },
        { text: '24/7 priority support' },
        { text: 'Leadership assessment' },
        { text: 'Custom development plan' },
        { text: 'Monthly progress review' },
      ],
      ctaLabel: 'Start Leading',
      variant: 'teal' as const,
    },
  ],
};

export const AllSections: Story = {
  render: () => (
    <>
      <SectionHeader
        title={mockContent.header.title}
        description={mockContent.header.description}
        primaryCta={mockContent.header.primaryCta}
        secondaryCta={mockContent.header.secondaryCta}
        background="blue"
      />
      <SectionContent
        title="About Our Coaching Services"
        content={mockContent.content}
      />
      <SectionContent
        title="Our Comprehensive Approach"
        content={mockContent.longContent}
        background="yellow"
      />
      <SectionCards
        title="Our Services"
        description="Comprehensive coaching solutions for your growth"
      >
        <Card title="Career Coaching" variant="blue" border>
          <p>Navigate your career path with confidence</p>
        </Card>
        <Card title="Life Coaching" variant="purple" border>
          <p>Achieve personal growth and fulfillment</p>
        </Card>
        <Card title="Business Coaching" variant="teal" border>
          <p>Develop leadership skills and business acumen</p>
        </Card>
      </SectionCards>
      <SectionFeatured
        title="Transform Your Life"
        description="Take the first step towards a better future with professional coaching"
        image="https://picsum.photos/id/1015/1200/800"
        cta={{
          href: '/contact',
          label: 'Start Your Journey',
          variant: 'blue',
        }}
        background="yellow"
      />
      <SectionTimeline
        title="Your Coaching Journey"
        description="A structured approach to achieving your goals"
        steps={[
          {
            title: 'Initial Consultation',
            description: 'Get to know each other and discuss your goals',
          },
          {
            title: 'Goal Setting',
            description: 'Define clear, achievable objectives',
          },
          {
            title: 'Action Plan',
            description: 'Create a personalized roadmap for success',
          },
          {
            title: 'Implementation',
            description: 'Put your plan into action with ongoing support',
          },
          {
            title: 'Progress Review',
            description:
              'Regular check-ins to measure progress and adjust strategy',
          },
          {
            title: 'Goal Achievement',
            description: 'Celebrate success and set new challenges',
          },
        ]}
        background="purple"
      />
      <SectionTestimonial
        title="Client Success Stories"
        description="Real experiences from our clients"
        testimonials={mockContent.testimonials}
        background="green"
      />
      <SectionTestimonial
        title="Transformational Journeys"
        description="In-depth experiences from our long-term clients"
        testimonials={mockContent.extendedTestimonials}
        background="blue"
      />
      <SectionPricing
        title="Investment in Your Future"
        description="Choose the package that best fits your needs"
        packages={mockContent.pricing}
      />
      <SectionBlog
        title="Latest Insights"
        description="Read our latest articles on personal development and coaching"
        posts={[
          {
            title: 'Finding Your Purpose',
            description:
              'A guide to discovering what truly matters in your life',
            slug: 'finding-your-purpose',
            date: '2024-03-15',
            categories: ['Personal Development'],
            image: 'https://picsum.photos/id/237/800/400',
            featured: true,
            variant: 'blue',
          },
          {
            title: 'Building Better Habits',
            description: 'Simple strategies for lasting change',
            slug: 'building-better-habits',
            date: '2024-03-10',
            categories: ['Self Improvement'],
            image: 'https://picsum.photos/id/870/800/400',
            variant: 'purple',
          },
          {
            title: 'Leadership in the Modern Age',
            description: "Essential skills for today's leaders",
            slug: 'modern-leadership',
            date: '2024-03-05',
            categories: ['Leadership'],
            image: 'https://picsum.photos/id/1016/800/400',
            variant: 'teal',
          },
        ]}
      />
      <SectionFAQ
        title="Frequently Asked Questions"
        description="Common questions about our coaching services"
        items={mockContent.faq}
        background="purple"
      />
      <SectionForm
        title="Get in Touch"
        description="Have questions? Send us a message"
        submitLabel="Send Message"
        background="blue"
      />
      <SectionCalendar
        title="Schedule Your Session"
        description="Choose a time that works best for you"
      />
    </>
  ),
};
