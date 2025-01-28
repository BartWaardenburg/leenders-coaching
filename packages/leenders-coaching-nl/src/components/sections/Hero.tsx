import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { CenteredContent } from "@/components/ui/CenteredContent";
import { DescriptionText } from "@/components/ui/DescriptionText";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Stack } from "@/components/ui/Stack";

type HeroProps = {
  title: string;
  description: string;
  primaryCta: {
    href: string;
    label: string;
  };
  secondaryCta: {
    href: string;
    label: string;
  };
};

/**
 * Hero section component with title, description and CTAs
 */
export const Hero = ({
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps) => {
  return (
    <Section className="relative">
      <CenteredContent>
        <Stack space={6}>
          <Heading
            level="h1"
            variant="gradient"
          >
            {title}
          </Heading>
          <DescriptionText>{description}</DescriptionText>
          <ButtonGroup>
            <Link href={primaryCta.href}>
              <Button size="lg" fullWidthOnMobile>
                {primaryCta.label}
              </Button>
            </Link>
            <Link href={secondaryCta.href}>
              <Button variant="outline" size="lg" fullWidthOnMobile>
                {secondaryCta.label}
              </Button>
            </Link>
          </ButtonGroup>
        </Stack>
      </CenteredContent>
    </Section>
  );
};
