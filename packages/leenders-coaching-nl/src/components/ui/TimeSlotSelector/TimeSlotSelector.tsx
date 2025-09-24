'use client';

import type { ReactNode } from 'react';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { Grid } from '@/components/ui/Grid';
import { cn } from '@/utilities/cn';
import { pastelVariant, type PastelVariant } from '@/utilities/tokens/tokens';
import type { TimeSlot } from '@/types/sanity/schema';

type TimeSlotSelectorProps = {
  /** Array of available time slots */
  timeSlots: TimeSlot[];
  /** Currently selected time slot */
  selectedSlot?: TimeSlot | null;
  /** Callback when a time slot is selected */
  onSelectSlot: (slot: TimeSlot) => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Color variant for selected time slots */
  variant?: PastelVariant;
};

/**
 * Utility function to calculate end time from start time and duration
 */
const calculateEndTime = (startTime?: string, duration?: number): string => {
  if (!startTime || duration === undefined) return '';

  const [hours, minutes] = startTime.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours ?? 0, minutes ?? 0, 0, 0);

  const endDate = new Date(startDate.getTime() + (duration ?? 0) * 60 * 1000);

  return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
};

/**
 * Utility function to format time from HH:MM string
 */
const formatTime = (timeString?: string): string => {
  if (!timeString) return '';

  // Time is already in HH:MM format, just return it
  return timeString;
};

/**
 * Utility function to create a unique key for a time slot
 */
const getTimeSlotKey = (slot: TimeSlot, index: number): string => {
  return `${slot.startTime}-${slot.duration}-${slot.dayOfWeek}-${index}`;
};

/**
 * Individual time slot component with selection state
 */
type TimeSlotItemProps = {
  slot: TimeSlot;
  isSelected: boolean;
  isAvailable: boolean;
  disabled: boolean;
  onSelect: () => void;
  variant?: PastelVariant;
};

const TimeSlotItem = ({
  slot,
  isSelected,
  isAvailable,
  disabled,
  onSelect,
  variant = 'blue',
}: TimeSlotItemProps): ReactNode => {
  const startTime = formatTime(slot.startTime);
  const endTime = calculateEndTime(slot.startTime, slot.duration);
  const duration = slot.duration ? `${slot.duration} min` : '';

  const handleClick = (): void => {
    if (isAvailable && !disabled) {
      onSelect();
    }
  };

  const slotClasses = cn(
    'relative p-3 border transition-theme cursor-pointer',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    {
      [pastelVariant[variant].bg]: isSelected,
      [pastelVariant[variant].borderDark]: isSelected,
      [pastelVariant[variant].textLight]: isSelected,
      'border-foreground/20 bg-background hover:border-foreground/40 hover:bg-foreground/5':
        !isSelected && isAvailable && !disabled,
      'border-foreground/10 bg-foreground/5 text-foreground/40 cursor-not-allowed':
        !isAvailable || disabled,
    }
  );

  return (
    <div
      className={slotClasses}
      onClick={handleClick}
      role="button"
      tabIndex={isAvailable && !disabled ? 0 : -1}
      aria-pressed={isSelected}
      aria-disabled={!isAvailable || disabled}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isAvailable && !disabled) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="text-center">
        <Text
          variant="small"
          weight="medium"
          className={cn(
            'mb-1',
            isSelected
              ? 'text-inherit'
              : isAvailable && !disabled
                ? 'text-foreground'
                : 'text-foreground/40'
          )}
        >
          {startTime} - {endTime}
        </Text>
        {duration && (
          <Text
            variant="small"
            className={cn(
              'text-xs',
              isSelected
                ? 'text-inherit opacity-80'
                : isAvailable && !disabled
                  ? 'text-foreground/60'
                  : 'text-foreground/30'
            )}
          >
            {duration}
          </Text>
        )}
      </div>
    </div>
  );
};

/**
 * Component for selecting a time slot from available options
 */
export const TimeSlotSelector = ({
  timeSlots,
  selectedSlot,
  onSelectSlot,
  disabled = false,
  variant = 'green',
}: TimeSlotSelectorProps): ReactNode => {
  if (timeSlots.length === 0) {
    return (
      <Box>
        <Text weight="bold" className="mb-3">
          Beschikbare tijden
        </Text>
        <Text variant="small" className="text-foreground/60">
          Geen beschikbare tijden voor deze datum.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text weight="bold" className="mb-3">
        Beschikbare tijden
      </Text>
      <Grid cols={{ base: 2, sm: 3 }} gap={3}>
        {timeSlots.map((slot, index) => {
          const slotKey = getTimeSlotKey(slot, index);
          const selectedKey = selectedSlot
            ? getTimeSlotKey(
                selectedSlot,
                timeSlots.findIndex((s) => s === selectedSlot)
              )
            : null;
          const isSelected = selectedKey === slotKey;
          const isAvailable = slot.isAvailable !== false;

          return (
            <TimeSlotItem
              key={slotKey}
              slot={slot}
              isSelected={isSelected}
              isAvailable={isAvailable}
              disabled={disabled}
              onSelect={() => onSelectSlot(slot)}
              variant={variant}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
