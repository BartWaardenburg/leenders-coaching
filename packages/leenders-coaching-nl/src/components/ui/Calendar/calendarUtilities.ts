/** Type for specifying a date range */
export type DateRange = {
  start: Date;
  end: Date;
};

/** Type for specifying days of the week (0 = Sunday, 6 = Saturday) */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Union type for different ways to specify disabled dates */
export type DisabledDates = {
  /** Specific dates that should be disabled */
  dates?: Date[];
  /** Date ranges that should be disabled */
  ranges?: DateRange[];
  /** Days of the week that should be disabled */
  daysOfWeek?: DayOfWeek[];
};

export const monthNames = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December',
];

/* Week days starting with Monday */
export const weekDays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

/**
 * Converts a JavaScript day number (0-6, starting with Sunday)
 * to an ISO day number (1-7, starting with Monday)
 */
const toISODayNumber = (dayNumber: number): number => {
  return dayNumber === 0 ? 7 : dayNumber;
};

/**
 * Converts an ISO day number (1-7, starting with Monday)
 * to a JavaScript day number (0-6, starting with Sunday)
 */
const fromISODayNumber = (isoDayNumber: number): number => {
  return isoDayNumber === 7 ? 0 : isoDayNumber;
};

/**
 * Formats the current month and year
 */
export const formatMonthYear = (date: Date): string => {
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${month} ${year}`;
};

/**
 * Checks if a date is in the past
 */
export const isPastDay = (date: Date): boolean => {
  return date < new Date(new Date().setHours(0, 0, 0, 0));
};

/**
 * Checks if a date is within any of the disabled ranges
 */
export const isDateInRanges = (date: Date, ranges?: DateRange[]): boolean => {
  if (!ranges?.length) return false;

  return ranges.some(
    (range) =>
      date >= new Date(range.start.setHours(0, 0, 0, 0)) &&
      date <= new Date(range.end.setHours(23, 59, 59, 999)),
  );
};

/**
 * Checks if a date matches any of the disabled criteria
 */
export const isDateDisabled = (
  date: Date,
  disabledDates?: DisabledDates,
): boolean => {
  if (!disabledDates) return false;

  // Check specific dates
  const isSpecificDate = disabledDates.dates?.some(
    (disabledDate) =>
      date.getDate() === disabledDate.getDate() &&
      date.getMonth() === disabledDate.getMonth() &&
      date.getFullYear() === disabledDate.getFullYear(),
  );
  if (isSpecificDate) return true;

  // Check day of week
  const isDayOfWeek = disabledDates.daysOfWeek?.includes(
    fromISODayNumber(toISODayNumber(date.getDay())) as DayOfWeek,
  );
  if (isDayOfWeek) return true;

  // Check ranges
  return isDateInRanges(date, disabledDates.ranges);
};

/**
 * Checks if the given date is in the current month
 */
export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
  return (
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  );
};

/**
 * Checks if the given date is today
 */
export const isToday = (date: Date): boolean => {
  return date.toDateString() === new Date().toDateString();
};

/**
 * Checks if the current month is the current month of today
 */
export const isCurrentMonthToday = (currentDate: Date): boolean => {
  const today = new Date();
  return (
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Generates an array of weeks containing dates for the calendar
 */
export const generateCalendarWeeks = (currentDate: Date): Date[][] => {
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  /* Get the first day of the month */
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  /* Get the last day of the month */
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  /* Get the ISO day of the week the month starts on (1 = Monday, 7 = Sunday) */
  const startDay = toISODayNumber(firstDayOfMonth.getDay());

  /* Get total days in the month */
  const daysInMonth = lastDayOfMonth.getDate();

  /* Add empty days before the first of the month */
  for (let i = 1; i < startDay; i++) {
    const prevDate = new Date(firstDayOfMonth);
    prevDate.setDate(prevDate.getDate() - (startDay - i));
    currentWeek.push(prevDate);
  }

  /* Add all days of the month */
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    currentWeek.push(dayDate);

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  }

  /* Add remaining days to complete the last week */
  if (currentWeek.length > 0) {
    const remainingDays = 7 - currentWeek.length;
    const lastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      daysInMonth,
    );

    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + i);
      currentWeek.push(nextDate);
    }
    weeks.push([...currentWeek]);
  }

  return weeks;
};
