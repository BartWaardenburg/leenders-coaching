import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

/**
 * 404 page for blog posts
 */
export default function NotFound() {
  return (
    <Section>
      <Stack space={12}>
        <PageHeader
          title="Blog Post Not Found"
          description="The blog post you're looking for doesn't exist or has been moved."
        />
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </Stack>
    </Section>
  );
}
