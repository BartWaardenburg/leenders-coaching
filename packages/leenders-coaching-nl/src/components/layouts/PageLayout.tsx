import type { ReactNode } from "react";

import { ContentSection } from "@/components/sections/ContentSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stack } from "@/components/ui/Stack";

type PageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

/**
 * Generic page layout component with consistent header and content structure
 */
export const PageLayout = ({
  title,
  description,
  children,
  className,
}: PageLayoutProps) => {
  return (
    <Stack space={12} className="px-4 py-8 md:py-12">
      <PageHeader title={title} description={description} />
      <ContentSection className={className}>{children}</ContentSection>
    </Stack>
  );
};
