/**
 * Format a date string to a readable format
 * @param dateString - The date string to format (ISO 8601 or other valid date format)
 * @returns Formatted date string in "Month Day, Year" format (e.g., "January 15, 2024")
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
