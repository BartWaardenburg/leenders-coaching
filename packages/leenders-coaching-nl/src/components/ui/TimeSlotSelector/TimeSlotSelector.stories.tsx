import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { TimeSlotSelector } from './TimeSlotSelector';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import type { TimeSlot } from '@/types/sanity/schema';
import { type PastelVariant } from '@/utilities/tokens';

// Mock time slots for the stories
const mockTimeSlots: TimeSlot[] = [
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '10:00',
    duration: 90,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '14:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '15:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '16:00',
    duration: 60,
    isAvailable: false,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1, // Monday
    startTime: '17:00',
    duration: 60,
    isAvailable: true,
  },
];

const mockTimeSlotsMixed: TimeSlot[] = [
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '09:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '10:30',
    duration: 45,
    isAvailable: false,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '14:00',
    duration: 60,
    isAvailable: true,
  },
  {
    _type: 'timeSlot',
    dayOfWeek: 1,
    startTime: '15:30',
    duration: 90,
    isAvailable: true,
  },
];

const meta = {
  title: 'UI/TimeSlotSelector',
  component: TimeSlotSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Component for selecting time slots from available options with visual selection states.',
      },
    },
  },
  argTypes: {
    timeSlots: {
      control: false,
      description: 'Array of available time slots',
    },
    selectedSlot: {
      control: false,
      description: 'Currently selected time slot',
    },
    onSelectSlot: {
      action: 'slotSelected',
      description: 'Callback when a time slot is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the selector is disabled',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'Color variant for selected time slots',
    },
  },
} satisfies Meta<typeof TimeSlotSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'green',
  },
};

export const WithSelectedSlot: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: mockTimeSlots[2], // Select the 14:00 slot
    onSelectSlot: fn(),
    disabled: false,
    variant: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with a pre-selected time slot.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: true,
    variant: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector in disabled state.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    timeSlots: [],
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with no available time slots.',
      },
    },
  },
};

export const BlueVariant: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with blue color variant.',
      },
    },
  },
};

export const PurpleVariant: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'purple',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with purple color variant.',
      },
    },
  },
};

export const PinkVariant: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'pink',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with pink color variant.',
      },
    },
  },
};

export const AllVariants: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        story: 'Display of all color variants for TimeSlotSelector.',
      },
    },
  },
  render: (args) => {
    const variants: PastelVariant[] = [
      'blue',
      'purple',
      'green',
      'pink',
      'yellow',
      'teal',
    ];

    return (
      <Box className="space-y-6">
        <Text variant="large" weight="bold">
          TimeSlotSelector Variants
        </Text>
        {variants.map((variant) => (
          <Box key={variant} className="space-y-2">
            <Text weight="medium" className="capitalize">
              {variant} Variant
            </Text>
            <TimeSlotSelector
              {...args}
              variant={variant}
              timeSlots={mockTimeSlots.slice(0, 3)} // Limit slots for demo
            />
          </Box>
        ))}
      </Box>
    );
  },
};

export const MixedAvailability: Story = {
  args: {
    timeSlots: mockTimeSlotsMixed,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'green',
  },
  parameters: {
    docs: {
      description: {
        story: 'TimeSlotSelector with mixed available and unavailable slots.',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  args: {
    timeSlots: mockTimeSlots,
    selectedSlot: null,
    onSelectSlot: fn(),
    disabled: false,
    variant: 'blue',
  },
  render: (args) => {
    const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(
      null
    );
    const [disabled, setDisabled] = React.useState(false);

    const handleSelectSlot = (slot: TimeSlot) => {
      setSelectedSlot(slot);
      args.onSelectSlot(slot);
    };

    return (
      <Box className="max-w-md mx-auto p-4 space-y-4">
        <Box className="space-y-2">
          <Text weight="bold">TimeSlotSelector Demo</Text>
          <Box className="flex gap-2">
            <button
              onClick={() => setDisabled(!disabled)}
              className={`px-3 py-1 rounded text-sm ${
                disabled
                  ? 'bg-gray-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } transition-colors`}
            >
              {disabled ? 'Enable' : 'Disable'} Selector
            </button>
            <button
              onClick={() => setSelectedSlot(null)}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Clear Selection
            </button>
          </Box>
        </Box>

        <TimeSlotSelector
          {...args}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
          disabled={disabled}
        />

        {selectedSlot && (
          <Box className="p-3 bg-green-50 border border-green-200 rounded">
            <Text variant="small" weight="medium" className="text-green-800">
              Selected: {selectedSlot.startTime} -{' '}
              {selectedSlot.startTime && selectedSlot.duration
                ? `${String(Number(selectedSlot.startTime.split(':')[0]) + Math.floor(selectedSlot.duration / 60)).padStart(2, '0')}:${String((Number(selectedSlot.startTime.split(':')[1]) + (selectedSlot.duration % 60)) % 60).padStart(2, '0')}`
                : selectedSlot.startTime}
              {selectedSlot.duration && ` (${selectedSlot.duration} min)`}
            </Text>
          </Box>
        )}
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with state management and controls.',
      },
    },
  },
};
