/**
 * Helper function to transform nullable types to a defined value
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
 */
export const transformNullableArray = <T, R>(
  array: (T | null)[] | null | undefined,
  transform: (item: T | null | undefined) => R
): R[] => {
  if (!array) return [];
  return array.map((item) => transform(item));
};
