'use client';

import { FC, useState } from 'react';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { twMerge } from 'tailwind-merge';
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
}: CalendarProps) => {
  const { accessibility } = useConfig();
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [direction, setDirection] = useState(0);

  const handlePreviousMonth = () => {
    setDirection(-1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const handleDayClick = (day: Date) => {
    if (isPastDay(day) || isDateDisabled(day, disabledDates)) return;
    onSelectDate?.(day);
  };

  const weeks = generateCalendarWeeks(currentDate);
  const currentMonthYearText = formatMonthYear(currentDate);
  const isCurrentMonthTodayValue = isCurrentMonthToday(currentDate);

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
    <Box className={twMerge('w-full max-w-none', className)}>
      {/* Month and year header with navigation */}
      <Flex justify="between" items="center" className="mb-4 md:hidden">
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
            className={twMerge(
              'w-6 h-6',
              isCurrentMonthTodayValue
                ? 'text-foreground/50'
                : 'text-foreground',
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
            >
              {currentMonthYearText}
            </MotionText>
          </AnimatePresence>
        </Box>

        <IconButton
          label={accessibility.calendar.nextMonth}
          onClick={handleNextMonth}
          variant="ghost"
        >
          <Icon
            path="M8.25 4.5l7.5 7.5-7.5 7.5"
            className="w-6 h-6 text-foreground"
          />
        </IconButton>
      </Flex>

      <Flex className="flex-col md:flex-row md:items-stretch gap-4">
        {/* Previous month button - desktop only */}
        <Flex
          justify="center"
          onClick={!isCurrentMonthTodayValue ? handlePreviousMonth : undefined}
          className={twMerge(
            'hidden md:flex w-8 self-center cursor-pointer group transition-opacity duration-200',
            !isCurrentMonthTodayValue
              ? 'cursor-pointer hover:opacity-70'
              : 'opacity-50 cursor-default',
          )}
        >
          <Text
            variant="card-meta"
            weight="medium"
            className={twMerge(
              'border-l border-foreground/80 transition-colors duration-200 [writing-mode:vertical-rl] rotate-180',
              !isCurrentMonthTodayValue && 'group-hover:border-primary',
            )}
          >
            {accessibility.calendar.previousMonth}
          </Text>
        </Flex>

        <MotionBox
          className="flex-1"
          key={currentDate.toISOString()}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Month and year header - desktop only */}
          <Flex justify="center" className="mb-6 hidden md:flex relative">
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
              >
                {currentMonthYearText}
              </MotionText>
            </AnimatePresence>
          </Flex>

          {/* Week day headers */}
          <Box className="border border-foreground/20 border-b-0">
            <Box className="grid grid-cols-7">
              {weekDays.map((day, index) => (
                <Box
                  key={day}
                  className={twMerge(
                    'p-2 md:p-3 text-center bg-pastel-pink dark:bg-pastel-pink-dark',
                    index !== 0 && 'border-l border-foreground/20',
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
            <Box className="grid grid-cols-7">
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  const dayIsCurrentMonth = isCurrentMonth(day, currentDate);
                  const dayIsToday = isToday(day);
                  const dayIsPastDay = isPastDay(day);
                  const dayIsDisabled = isDateDisabled(day, disabledDates);
                  const isInteractive = !dayIsPastDay && !dayIsDisabled;

                  return (
                    <MotionBox
                      key={`${weekIndex}-${dayIndex}`}
                      onClick={
                        isInteractive ? () => handleDayClick(day) : undefined
                      }
                      className={twMerge(
                        'p-2 md:p-3 min-h-[4rem] md:min-h-[5rem] transition-colors duration-200 relative',
                        dayIndex !== 0 && 'border-l border-foreground/20',
                        weekIndex !== 0 && 'border-t border-foreground/20',
                        dayIsCurrentMonth
                          ? isInteractive
                            ? 'bg-pastel-green/40 dark:bg-pastel-green-dark/40'
                            : 'bg-background'
                          : 'bg-pastel-blue/40 dark:bg-pastel-blue-dark/40',
                        isInteractive && [
                          'cursor-pointer',
                          dayIsCurrentMonth
                            ? 'hover:bg-pastel-green/80 dark:hover:bg-pastel-green-dark/80'
                            : 'hover:bg-pastel-blue/80 dark:hover:bg-pastel-blue-dark/80',
                        ],
                        dayIsToday &&
                        'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary',
                        isInteractive &&
                        dayIsCurrentMonth &&
                        'ring-inset ring-1 ring-foreground/80',
                        (dayIsPastDay || dayIsDisabled) &&
                        'opacity-50 cursor-default',
                      )}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.1,
                        delay: (weekIndex * 7 + dayIndex) * 0.0075,
                      }}
                      whileHover={
                        isInteractive
                          ? {
                            scale: 0.97,
                            transition: { duration: 0.2 },
                          }
                          : undefined
                      }
                      whileTap={
                        isInteractive
                          ? {
                            scale: 0.95,
                            transition: { duration: 0.1 },
                          }
                          : undefined
                      }
                    >
                      <Flex direction="column" className="gap-1 md:gap-2">
                        <Text
                          variant="small"
                          className={twMerge(
                            'text-right',
                            (dayIsPastDay || dayIsDisabled) && 'line-through',
                            !dayIsCurrentMonth && 'text-foreground/50',
                          )}
                          color={
                            dayIsCurrentMonth && isInteractive
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
                }),
              )}
            </Box>
          </Box>
        </MotionBox>

        {/* Next month button - desktop only */}
        <Flex
          justify="center"
          onClick={handleNextMonth}
          className="hidden md:flex w-8 self-center cursor-pointer group transition-opacity duration-200 hover:opacity-70"
        >
          <Text
            variant="card-meta"
            weight="medium"
            className="border-l border-foreground/80 group-hover:border-primary transition-colors duration-200 [writing-mode:vertical-rl]"
          >
            {accessibility.calendar.nextMonth}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
