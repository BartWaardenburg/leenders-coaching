/**
 * Helper function to transform nullable types to a defined value
 * @param value - The value that might be null or undefined
 * @param defaultValue - The default value to return if value is null or undefined
 * @returns The original value if it exists, otherwise the default value
 */
export const transformNullable = <T>(
  value: T | null | undefined,
  defaultValue: T
): T => {
  if (value === undefined || value === null) return defaultValue;
  return value;
};

/**
 * Helper to transform nullable array
 * @param array - The array that might be null or undefined
 * @param transform - Function to transform each item in the array
 * @returns Array of transformed items, or empty array if input is null/undefined
 */
export const transformNullableArray = <T, R>(
  array: (T | null)[] | null | undefined,
  transform: (item: T | null | undefined) => R
): R[] => {
  if (!array) return [];
  return array.map((item) => transform(item));
};
