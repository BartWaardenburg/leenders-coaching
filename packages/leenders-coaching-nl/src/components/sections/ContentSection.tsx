import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

type ContentSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Generic content section with consistent styling
 */
export const ContentSection = ({
  children,
  className = "",
}: ContentSectionProps) => {
  return (
    <Section>
      <Stack
        className={twMerge(
          "prose prose-2xl max-w-4xl mx-auto",
          /* Headings */
          "prose-h1:font-playfair prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-6",
          "prose-h2:font-playfair prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mb-4",
          "prose-h3:font-playfair prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mb-4",
          "prose-headings:text-foreground prose-headings:font-extrabold",
          /* Paragraphs */
          "prose-p:font-montserrat prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-xl",
          "prose-p:mb-6",
          /* Lists */
          "prose-ul:text-muted-foreground prose-ul:font-montserrat prose-ul:text-xl prose-ul:mb-6",
          "prose-li:marker:text-primary",
          /* Other elements */
          "prose-strong:text-foreground prose-strong:font-bold",
          "dark:prose-invert",
          className,
        )}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent dark:via-secondary/10 -z-10" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Stack>
    </Section>
  );
};
