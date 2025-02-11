import { FC, useState } from 'react'
import { Box } from '@/components/ui/Box'
import { Text } from '@/components/ui/Text'
import { twMerge } from 'tailwind-merge'
import { Flex } from '@/components/ui/Flex'
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
} from './calendarUtilities'

type CalendarProps = {
  /** The initial date to display the calendar for */
  initialDate: Date
  /** Optional className for styling */
  className?: string
  /** Optional render prop for day content */
  renderDay?: (date: Date) => React.ReactNode
  /** Callback when a day is clicked */
  onSelectDate?: (date: Date) => void
  /** Configuration for disabled dates */
  disabledDates?: DisabledDates
}

/**
 * Calendar component that displays a month view in a grid format
 */
export const Calendar: FC<CalendarProps> = ({
  initialDate,
  className,
  renderDay,
  onSelectDate,
  disabledDates,
}: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate)

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDayClick = (day: Date) => {
    if (isPastDay(day) || isDateDisabled(day, disabledDates)) return
    onSelectDate?.(day)
  }

  const weeks = generateCalendarWeeks(currentDate)
  const currentMonthYearText = formatMonthYear(currentDate)
  const isCurrentMonthTodayValue = isCurrentMonthToday(currentDate)

  return (
    <Box className={twMerge('w-full max-w-none', className)}>
      {/* Month and year header */}
      <Flex justify="center" className="mb-6">
        <Text variant="card-meta" className="text-lg" weight="medium">{currentMonthYearText}</Text>
      </Flex>

      <Flex className="items-stretch gap-4">
        {/* Previous month button */}
        <Flex
          justify="center"
          onClick={!isCurrentMonthTodayValue ? handlePreviousMonth : undefined}
          className={twMerge(
            "w-8 self-center [writing-mode:vertical-lr] rotate-180 group",
            !isCurrentMonthTodayValue ? "cursor-pointer" : "opacity-50 cursor-default"
          )}
        >
          <Text
            variant="card-meta"
            weight="medium"
            className={twMerge(
              "border-l border-foreground/80 transition-colors",
              !isCurrentMonthTodayValue && "group-hover:border-primary"
            )}
          >
            Vorige maand
          </Text>
        </Flex>

        <Box className="flex-1">
          {/* Week day headers */}
          <Box className="grid grid-cols-7 border-t border-l border-foreground/80">
            {weekDays.map((day) => (
              <Box key={day} className="p-3 text-center border-r border-b border-foreground/80 bg-pastel-pink dark:bg-pastel-pink-dark">
                <Text variant="small" weight="medium">{day}</Text>
              </Box>
            ))}
          </Box>

          {/* Calendar grid */}
          <Box className="grid grid-cols-7">
            {weeks.map((week, weekIndex) =>
              week.map((day, dayIndex) => {
                const dayIsCurrentMonth = isCurrentMonth(day, currentDate)
                const dayIsToday = isToday(day)
                const dayIsPastDay = isPastDay(day)
                const dayIsDisabled = isDateDisabled(day, disabledDates)
                const isInteractive = !dayIsPastDay && !dayIsDisabled

                return (
                  <Box
                    key={`${weekIndex}-${dayIndex}`}
                    onClick={isInteractive ? () => handleDayClick(day) : undefined}
                    className={twMerge(
                      /* Base styles */
                      'p-3 min-h-[5rem] transition-colors',

                      /* Border styles */
                      'border-r border-b border-foreground/80',
                      dayIndex === 0 && 'border-l',
                      dayIsToday && 'border-b-2 border-b-primary',

                      /* Background styles based on month */
                      dayIsCurrentMonth
                        ? 'bg-background'
                        : 'bg-pastel-blue dark:bg-pastel-blue-dark',

                      /* Interactive states */
                      isInteractive && [
                        'cursor-pointer',
                        dayIsCurrentMonth
                          ? 'bg-pastel-green dark:bg-pastel-green-dark'
                          : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                      ],

                      /* Disabled states */
                      (dayIsPastDay || dayIsDisabled) && 'opacity-50 cursor-default'
                    )}
                  >
                    <Flex direction="column" gap={2}>
                      <Text
                        variant="small"
                        className={twMerge(
                          "text-right",
                          (dayIsPastDay || dayIsDisabled) && "line-through",
                          !dayIsCurrentMonth && "text-foreground/50"
                        )}
                        color={dayIsCurrentMonth && isInteractive ? 'default' : 'muted'}
                      >
                        {day.getDate()}
                      </Text>
                      {renderDay?.(day)}
                    </Flex>
                  </Box>
                )
              })
            )}
          </Box>
        </Box>

        {/* Next month button */}
        <Flex
          justify="center"
          onClick={handleNextMonth}
          className="w-8 self-center [writing-mode:vertical-lr] cursor-pointer group"
        >
          <Text
            variant="card-meta"
            weight="medium"
            className="transition-theme border-l border-foreground/80 group-hover:border-primary transition-colors"
          >
            Volgende maand
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}