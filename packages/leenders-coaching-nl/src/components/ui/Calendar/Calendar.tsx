'use client';

import { FC, useState, useEffect, useRef } from 'react';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { cn } from '@/utilities/cn';
import { Flex } from '@/components/ui/Flex';
import { IconButton } from '@/components/ui/IconButton';
import { Icon } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'motion/react';
import {
  type DisabledDates,
  weekDays,
  formatMonthYear,
  isPastDay,
  isDateDisabled,
  isCurrentMonth,
  isToday,
  isCurrentMonthToday,
  generateCalendarWeeks,
} from './calendarUtilities';
import { useConfig } from '@/components/providers/ClientConfigProvider';

type CalendarProps = {
  /** The initial date to display the calendar for */
  initialDate: Date;
  /** Optional className for styling */
  className?: string;
  /** Optional render prop for day content */
  renderDay?: (date: Date) => React.ReactNode;
  /** Callback when a day is clicked */
  onSelectDate?: (date: Date) => void;
  /** Configuration for disabled dates */
  disabledDates?: DisabledDates;
  /** Maximum number of months in the future to allow navigation */
  maxMonthsInFuture?: number;
};

const MotionBox = motion.create(Box);
const MotionText = motion.create(Text);

/**
 * Calendar component that displays a month view in a grid format with smooth animations
 */
export const Calendar: FC<CalendarProps> = ({
  initialDate,
  className,
  renderDay,
  onSelectDate,
  disabledDates,
  maxMonthsInFuture,
}: CalendarProps) => {
  const { accessibility } = useConfig();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [direction, setDirection] = useState(0);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate((prev) =>
      prev.getFullYear() === initialDate.getFullYear() &&
      prev.getMonth() === initialDate.getMonth()
        ? prev
        : initialDate
    );
  }, [initialDate]);

  /**
   * Move to the previous month and set animation direction.
   * Disables if already at the current month.
   */
  const handlePreviousMonth = () => {
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  /**
   * Move to the next month and set animation direction.
   * Respects the maximum months in future limit if set.
   */
  const handleNextMonth = () => {
    if (maxMonthsInFuture !== undefined) {
      const today = new Date();
      const maxDate = new Date(
        today.getFullYear(),
        today.getMonth() + maxMonthsInFuture
      );
      const nextMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1
      );

      // Don't navigate if we would exceed the maximum months limit
      if (nextMonth > maxDate) {
        return;
      }
    }

    setDirection(1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  /**
   * Handles clicking on a day cell.
   * Ignores clicks on past, disabled, or out-of-range days.
   * @param day The date that was clicked
   */
  const handleDayClick = (day: Date) => {
    if (!isInteractive(day)) return;
    onSelectDate?.(day);
  };

  /**
   * Handles keyboard navigation and selection for a day cell.
   * @param e Keyboard event
   * @param day The date associated with the cell
   */
  const handleKeyDown = (e: React.KeyboardEvent, day: Date) => {
    if (!isInteractive(day)) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleDayClick(day);
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(day, 1, 0);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(day, -1, 0);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(day, 0, 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(day, 0, -1);
        break;
    }
  };

  /**
   * Determines if a day is interactive (not past and not disabled).
   * @param day The date to check
   * @returns True if the day is interactive
   */
  const isInteractive = (day: Date) => {
    return !isPastDay(day) && !isDateDisabled(day, disabledDates);
  };

  /**
   * Moves keyboard focus to another day in the grid, based on arrow key navigation.
   * @param currentDay The currently focused day
   * @param deltaX Horizontal movement (columns)
   * @param deltaY Vertical movement (rows)
   */
  const moveFocus = (currentDay: Date, deltaX: number, deltaY: number) => {
    const weeks = generateCalendarWeeks(currentDate);
    let currentWeekIndex = -1;
    let currentDayIndex = -1;

    // Find the current day position in the weeks grid
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex];
      if (!week) continue;
      const dayIndex = week.findIndex(
        (day) => day.getTime() === currentDay.getTime()
      );
      if (dayIndex !== -1) {
        currentWeekIndex = weekIndex;
        currentDayIndex = dayIndex;
        break;
      }
    }

    if (currentWeekIndex === -1 || currentDayIndex === -1) return;

    const newWeekIndex = currentWeekIndex + deltaY;
    const newDayIndex = currentDayIndex + deltaX;

    // Check if the new position is within bounds and interactive
    if (
      newWeekIndex >= 0 &&
      newWeekIndex < weeks.length &&
      newDayIndex >= 0 &&
      newDayIndex < 7
    ) {
      const newWeek = weeks[newWeekIndex];
      const newDay = newWeek?.[newDayIndex];
      if (newDay && isInteractive(newDay)) {
        setFocusedDate(newDay);
        // Focus the element in the DOM
        requestAnimationFrame(() => {
          const element = gridRef.current?.querySelector(
            `[data-ts="${newDay.getTime()}"]`
          ) as HTMLElement;
          element?.focus();
        });
      }
    }
  };

  /**
   * Checks if the next month button should be disabled.
   * @returns True if the next month button should be disabled
   */
  const isNextMonthDisabled = () => {
    if (maxMonthsInFuture === undefined) return false;

    const today = new Date();
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth() + maxMonthsInFuture
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );

    return nextMonth > maxDate;
  };

  const weeks = generateCalendarWeeks(currentDate);
  const currentMonthYearText = formatMonthYear(currentDate);
  const isCurrentMonthTodayValue = isCurrentMonthToday(currentDate);
  const isNextMonthDisabledValue = isNextMonthDisabled();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <Box className={cn('w-full max-w-none', className)}>
      {/* Mobile: Month and year header with navigation */}
      <Flex justify="between" items="center" className="mb-4 lg:hidden">
        <IconButton
          label={accessibility.calendar.previousMonth}
          onClick={!isCurrentMonthTodayValue ? handlePreviousMonth : undefined}
          disabled={isCurrentMonthTodayValue}
          variant="ghost"
          className={
            isCurrentMonthTodayValue ? 'opacity-50 cursor-default' : ''
          }
        >
          <Icon
            path="M15.75 19.5L8.25 12l7.5-7.5"
            className={cn(
              'w-6 h-6',
              isCurrentMonthTodayValue
                ? 'text-foreground/50'
                : 'text-foreground'
            )}
          />
        </IconButton>

        <Box className="relative flex-1 flex justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <MotionText
              key={currentMonthYearText}
              variant="card-meta"
              className="text-lg"
              weight="medium"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              aria-live="polite"
            >
              {currentMonthYearText}
            </MotionText>
          </AnimatePresence>
        </Box>

        <IconButton
          label={accessibility.calendar.nextMonth}
          onClick={!isNextMonthDisabledValue ? handleNextMonth : undefined}
          disabled={isNextMonthDisabledValue}
          variant="ghost"
        >
          <Icon
            path="M8.25 4.5l7.5 7.5-7.5 7.5"
            className={cn(
              'w-6 h-6',
              isNextMonthDisabledValue
                ? 'text-foreground/50'
                : 'text-foreground'
            )}
          />
        </IconButton>
      </Flex>

      <Flex className="flex-col lg:flex-row lg:items-stretch gap-4">
        {/* Desktop: Previous month button */}
        <Flex
          justify="center"
          onClick={!isCurrentMonthTodayValue ? handlePreviousMonth : undefined}
          className={cn(
            'hidden lg:flex w-8 self-center cursor-pointer group transition-opacity duration-200',
            !isCurrentMonthTodayValue
              ? 'cursor-pointer hover:opacity-70'
              : 'opacity-50 cursor-default'
          )}
        >
          <Text
            variant="card-meta"
            weight="medium"
            className={cn(
              'border-l border-foreground/80 transition-colors duration-200 [writing-mode:vertical-rl] rotate-180',
              !isCurrentMonthTodayValue && 'group-hover:border-primary'
            )}
          >
            {accessibility.calendar.previousMonth}
          </Text>
        </Flex>

        <MotionBox
          className="flex-1"
          key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Desktop: Month and year header */}
          <Flex justify="center" className="mb-6 hidden lg:flex relative">
            <AnimatePresence mode="wait" custom={direction}>
              <MotionText
                key={currentMonthYearText}
                variant="card-meta"
                className="text-lg"
                weight="medium"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                aria-live="polite"
              >
                {currentMonthYearText}
              </MotionText>
            </AnimatePresence>
          </Flex>

          {/* Weekday headers */}
          <Box className="border border-foreground/20 border-b-0">
            <Box role="row" className="grid grid-cols-7">
              {weekDays.map((day, index) => (
                <Box
                  key={day}
                  role="columnheader"
                  className={cn(
                    'p-2 lg:p-3 text-center bg-pastel-pink dark:bg-pastel-pink-dark',
                    index !== 0 && 'border-l border-foreground/20'
                  )}
                >
                  <Text variant="small" weight="medium">
                    {day}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Calendar grid */}
          <Box className="border border-foreground/20">
            <Box
              ref={gridRef}
              role="grid"
              aria-label="Kalender"
              className="grid grid-cols-7"
            >
              {weeks.map((week, weekIndex) => (
                <div role="row" className="contents" key={weekIndex}>
                  {week.map((day, dayIndex) => {
                    const dayIsCurrentMonth = isCurrentMonth(day, currentDate);
                    const dayIsToday = isToday(day);
                    const dayIsPastDay = isPastDay(day);
                    const dayIsDisabled = isDateDisabled(day, disabledDates);
                    const dayIsInteractive = isInteractive(day);

                    return (
                      <MotionBox
                        key={`${weekIndex}-${dayIndex}`}
                        role="gridcell"
                        tabIndex={dayIsInteractive ? 0 : -1}
                        aria-selected={focusedDate?.getTime() === day.getTime()}
                        aria-current={dayIsToday ? 'date' : undefined}
                        aria-disabled={!dayIsInteractive}
                        data-ts={day.getTime()}
                        onClick={
                          dayIsInteractive
                            ? () => handleDayClick(day)
                            : undefined
                        }
                        onKeyDown={
                          dayIsInteractive
                            ? (e: React.KeyboardEvent) => handleKeyDown(e, day)
                            : undefined
                        }
                        className={cn(
                          'p-2 lg:p-3 min-h-[4rem] lg:min-h-[5rem] transition-colors duration-200 relative',
                          dayIndex !== 0 && 'border-l border-foreground/20',
                          weekIndex !== 0 && 'border-t border-foreground/20',
                          dayIsCurrentMonth
                            ? dayIsInteractive
                              ? 'bg-pastel-green/40 dark:bg-pastel-green-dark/40'
                              : 'bg-background'
                            : 'bg-pastel-blue/40 dark:bg-pastel-blue-dark/40',
                          dayIsInteractive && [
                            'cursor-pointer',
                            dayIsCurrentMonth
                              ? 'hover:bg-pastel-green/80 dark:hover:bg-pastel-green-dark/80'
                              : 'hover:bg-pastel-blue/80 dark:hover:bg-pastel-blue-dark/80',
                          ],
                          dayIsToday &&
                            'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary',
                          dayIsInteractive &&
                            dayIsCurrentMonth &&
                            'ring-inset ring-1 ring-foreground/80',
                          (dayIsPastDay || dayIsDisabled) &&
                            'opacity-50 cursor-default'
                        )}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.1,
                          delay: (weekIndex * 7 + dayIndex) * 0.0075,
                        }}
                        whileHover={
                          dayIsInteractive
                            ? {
                                scale: 0.97,
                                transition: { duration: 0.2 },
                              }
                            : undefined
                        }
                        whileTap={
                          dayIsInteractive
                            ? {
                                scale: 0.95,
                                transition: { duration: 0.1 },
                              }
                            : undefined
                        }
                      >
                        <Flex direction="column" className="gap-1 lg:gap-2">
                          <Text
                            variant="small"
                            className={cn(
                              'text-right',
                              (dayIsPastDay || dayIsDisabled) && 'line-through',
                              !dayIsCurrentMonth && 'text-foreground/50'
                            )}
                            color={
                              dayIsCurrentMonth && dayIsInteractive
                                ? 'default'
                                : 'muted'
                            }
                          >
                            {day.getDate()}
                          </Text>
                          {renderDay?.(day)}
                        </Flex>
                      </MotionBox>
                    );
                  })}
                </div>
              ))}
            </Box>
          </Box>
        </MotionBox>

        {/* Desktop: Next month button */}
        <Flex
          justify="center"
          onClick={!isNextMonthDisabledValue ? handleNextMonth : undefined}
          className={cn(
            'hidden lg:flex w-8 self-center transition-opacity duration-200',
            !isNextMonthDisabledValue
              ? 'cursor-pointer group hover:opacity-70'
              : 'opacity-50 cursor-default'
          )}
        >
          <Text
            variant="card-meta"
            weight="medium"
            className={cn(
              'border-l border-foreground/80 transition-colors duration-200 [writing-mode:vertical-rl]',
              !isNextMonthDisabledValue && 'group-hover:border-primary'
            )}
          >
            {accessibility.calendar.nextMonth}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
