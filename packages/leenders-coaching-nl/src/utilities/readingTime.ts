import type { PortableTextBlock } from "@portabletext/types";

/**
 * Calculates the estimated reading time for a given array of Portable Text blocks
 * @param blocks - Array of Portable Text blocks
 * @param wordsPerMinute - Average reading speed in words per minute (default: 200)
 * @returns Formatted reading time string (e.g., "5 min read")
 */
export const calculateReadingTime = (
  blocks: PortableTextBlock[],
  wordsPerMinute = 200,
): string => {
  // Extract text content from blocks
  const text = blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text || "").join(" ");
    })
    .join(" ");

  // Count words (split by whitespace)
  const words = text.trim().split(/\s+/).length;

  // Calculate minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
};
