import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Main } from './Main';
import { waitForMotionAnimations } from '../../../test/chromatic-utils';

const meta = {
  title: 'UI/Main',
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Inhoud van de main sectie',
      type: { name: 'string', required: true },
    },
    className: {
      control: 'text',
      description: 'CSS klassen voor styling',
      type: { name: 'string', required: false },
    },
    testid: {
      control: 'text',
      description: 'Test identifier voor testing doeleinden',
      type: { name: 'string', required: false },
    },
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Main Example',
    testid: 'main-default',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Example')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Main Content Area</h1>
        <p className="text-gray-600 mb-6">
          This is the main content area of the page. It has a top margin of
          125px to account for the header and uses flexbox for layout.
        </p>
        <div className="bg-blue-100 p-4">
          <h2 className="text-xl font-semibold mb-2">Content Section</h2>
          <p className="text-sm">
            The Main component wraps content in a flex container with column
            direction and grows to fill available space.
          </p>
        </div>
      </div>
    ),
    testid: 'main-with-content',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Main Content Area')).toBeVisible();
    await expect(canvas.getByText('Content Section')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithCustomStyling: Story = {
  args: {
    children: (
      <div className="p-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">
          Custom Styled Main
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">Feature 1</h2>
            <p className="text-gray-600">
              This main component has custom styling applied through the
              className prop.
            </p>
          </div>
          <div className="bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-3">Feature 2</h2>
            <p className="text-gray-600">
              The Main component accepts all standard HTML main element props.
            </p>
          </div>
        </div>
      </div>
    ),
    className: 'bg-gradient-to-br from-purple-50 to-blue-50',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Custom Styled Main')).toBeVisible();
    await expect(canvas.getByText('Feature 1')).toBeVisible();
    await expect(canvas.getByText('Feature 2')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const ComplexLayout: Story = {
  args: {
    children: (
      <div className="p-8 space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-4">Complex Layout Example</h1>
          <p className="text-xl text-gray-600">
            This demonstrates how the Main component can contain complex layouts
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Main Content</h2>
              <p className="text-gray-600 mb-4">
                The Main component provides a semantic container for the primary
                content of the page. It automatically handles the top margin for
                fixed headers and uses flexbox for consistent layout.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 text-sm">
                  Semantic HTML
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 text-sm">
                  Flexbox Layout
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 text-sm">
                  Header Spacing
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6">
              <h3 className="text-xl font-semibold mb-3">Usage Notes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Uses Flex component internally with column direction</li>
                <li>• Has a top margin of 125px for header clearance</li>
                <li>• Grows to fill available vertical space</li>
                <li>• Accepts all standard main element props</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Sidebar</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3">
                  <h4 className="font-medium">Related Content</h4>
                  <p className="text-sm text-gray-600">
                    Additional information
                  </p>
                </div>
                <div className="bg-green-50 p-3">
                  <h4 className="font-medium">Quick Links</h4>
                  <p className="text-sm text-gray-600">Navigation shortcuts</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6">
              <h3 className="text-lg font-semibold mb-2">Info Box</h3>
              <p className="text-sm text-gray-700">
                The Main component is built on top of the Flex component and
                provides semantic meaning for screen readers and SEO.
              </p>
            </div>
          </aside>
        </section>

        <footer className="bg-gray-100 p-6 text-center">
          <p className="text-gray-600">
            This footer demonstrates how content flows within the Main component
          </p>
        </footer>
      </div>
    ),
    testid: 'main-complex',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('main-complex')).toBeVisible();
    await expect(canvas.getByText('Complex Layout Example')).toBeVisible();
    await expect(canvas.getByText('Main Content')).toBeVisible();
    await expect(canvas.getByText('Sidebar')).toBeVisible();
    await expect(canvas.getByText('Info Box')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Form</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>
    ),
    testid: 'main-with-form',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Contact Form')).toBeVisible();
    await expect(canvas.getByText('Name')).toBeVisible();
    await expect(canvas.getByText('Email')).toBeVisible();
    await expect(canvas.getByText('Message')).toBeVisible();
    await expect(canvas.getByText('Send Message')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Minimal Content
        </h1>
        <p className="text-gray-600">
          Sometimes the main content area only needs simple text content.
        </p>
      </div>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Minimal Content')).toBeVisible();
    await waitForMotionAnimations({ canvas });
  },
};
