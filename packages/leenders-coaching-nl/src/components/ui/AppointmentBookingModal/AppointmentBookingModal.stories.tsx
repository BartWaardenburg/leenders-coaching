import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { AppointmentBookingModal } from './AppointmentBookingModal';
import type { TimeSlot } from '@/types/sanity/schema';

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
    duration: 60,
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
];

const mockAppointmentSubmit = async (data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  selectedTimeSlot: TimeSlot;
}) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Appointment submitted:', data);
  throw new Error('Demo error - this is expected in Storybook');
};

const meta = {
  title: 'UI/AppointmentBookingModal',
  component: AppointmentBookingModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modal component for booking appointments with date/time selection and contact form.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Of de modal open is',
    },
    selectedDate: {
      control: 'date',
      description: 'De geselecteerde datum voor de afspraak',
    },
    availableTimeSlots: {
      control: false,
      description: 'Beschikbare tijdsloten voor de geselecteerde datum',
    },
    onClose: {
      action: 'closed',
      description: 'Callback functie wanneer de modal wordt gesloten',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback functie wanneer een afspraak wordt ingediend',
    },
    title: {
      control: 'text',
      description: 'Titel van de modal',
    },
    description: {
      control: 'text',
      description: 'Beschrijving van de modal',
    },
    variant: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'yellow', 'teal'],
      description: 'De visuele stijl variant van de modal',
    },
  },
} satisfies Meta<typeof AppointmentBookingModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    selectedDate: new Date('2024-12-20'),
    availableTimeSlots: mockTimeSlots,
    onClose: fn(),
    onSubmit: mockAppointmentSubmit,
    title: 'Afspraak boeken',
    description:
      'Boek een afspraak voor een persoonlijk gesprek over je ontwikkelingsmogelijkheden.',
  },
};

export const WithPreFilledData: Story = {
  args: {
    isOpen: true,
    selectedDate: new Date('2024-12-20'),
    availableTimeSlots: mockTimeSlots,
    onClose: fn(),
    onSubmit: mockAppointmentSubmit,
    title: 'Follow-up afspraak',
    description: 'Plan een vervolgafspraak na je eerste sessie.',
    variant: 'green',
  },
};

export const WithCustomTitleAndDescription: Story = {
  args: {
    isOpen: true,
    selectedDate: new Date('2024-12-22'),
    availableTimeSlots: mockTimeSlots,
    onClose: fn(),
    onSubmit: mockAppointmentSubmit,
    title: 'Persoonlijke coaching sessie',
    description:
      'Een-op-een begeleiding om je persoonlijke doelen te bereiken.',
    variant: 'purple',
  },
};

export const PurpleVariant: Story = {
  args: {
    isOpen: true,
    selectedDate: new Date('2024-12-21'),
    availableTimeSlots: mockTimeSlots,
    onClose: fn(),
    onSubmit: mockAppointmentSubmit,
    title: 'Intake gesprek',
    variant: 'purple',
  },
};

export const GreenVariant: Story = {
  args: {
    isOpen: true,
    selectedDate: new Date('2024-12-21'),
    availableTimeSlots: mockTimeSlots,
    onClose: fn(),
    onSubmit: mockAppointmentSubmit,
    title: 'Groei sessie',
    variant: 'green',
  },
};
