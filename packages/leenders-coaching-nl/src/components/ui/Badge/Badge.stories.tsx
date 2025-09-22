import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge, type BadgeVariant } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A generic badge component for displaying labels, categories, or status indicators. Follows the same design patterns as Card, Toast, and Modal components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to display in the badge',
      control: 'text',
    },
    variant: {
      description: 'Visual style variant of the badge',
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
    },
    size: {
      description: 'Size variant of the badge',
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    interactive: {
      description: 'Whether to show hover animations',
      control: 'boolean',
    },
    className: {
      description: 'Optional className for styling',
      control: 'text',
    },
    testid: {
      description: 'Test ID for testing',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge
 */
export const Default: Story = {
  args: {
    children: 'Default Badge',
    testid: 'badge-default',
  },
};

/**
 * All color variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(
        ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'] as BadgeVariant[]
      ).map((variant) => (
        <Badge key={variant} variant={variant} testid={`badge-${variant}`}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge size="small" testid="badge-small">
        Small
      </Badge>
      <Badge size="medium" testid="badge-medium">
        Medium
      </Badge>
      <Badge size="large" testid="badge-large">
        Large
      </Badge>
    </div>
  ),
};

/**
 * Interactive badges with hover effects
 */
export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue" interactive testid="badge-interactive-blue">
        Interactive Blue
      </Badge>
      <Badge variant="green" interactive testid="badge-interactive-green">
        Interactive Green
      </Badge>
      <Badge variant="purple" interactive testid="badge-interactive-purple">
        Interactive Purple
      </Badge>
    </div>
  ),
};

/**
 * Category badges (as used in blog posts)
 */
export const Categories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue" testid="badge-category-1">
        Personal Development
      </Badge>
      <Badge variant="green" testid="badge-category-2">
        Confidence Building
      </Badge>
      <Badge variant="purple" testid="badge-category-3">
        Goal Setting
      </Badge>
      <Badge variant="pink" testid="badge-category-4">
        Leadership
      </Badge>
      <Badge variant="yellow" testid="badge-category-5">
        Communication
      </Badge>
      <Badge variant="teal" testid="badge-category-6">
        Productivity
      </Badge>
    </div>
  ),
};

/**
 * Status indicators
 */
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="green" testid="badge-status-success">
        Success
      </Badge>
      <Badge variant="yellow" testid="badge-status-warning">
        Warning
      </Badge>
      <Badge variant="pink" testid="badge-status-error">
        Error
      </Badge>
      <Badge variant="blue" testid="badge-status-info">
        Info
      </Badge>
    </div>
  ),
};

/**
 * Long text badges
 */
export const LongText: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue" testid="badge-long-1">
        Advanced Personal Development and Growth
      </Badge>
      <Badge variant="green" testid="badge-long-2">
        Professional Communication Skills
      </Badge>
      <Badge variant="purple" testid="badge-long-3">
        Strategic Leadership and Management
      </Badge>
    </div>
  ),
};

/**
 * Mixed content badges
 */
export const MixedContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue" testid="badge-mixed-1">
        📚 Learning
      </Badge>
      <Badge variant="green" testid="badge-mixed-2">
        ✅ Completed
      </Badge>
      <Badge variant="purple" testid="badge-mixed-3">
        🔥 Featured
      </Badge>
      <Badge variant="pink" testid="badge-mixed-4">
        ⭐ Premium
      </Badge>
    </div>
  ),
};
