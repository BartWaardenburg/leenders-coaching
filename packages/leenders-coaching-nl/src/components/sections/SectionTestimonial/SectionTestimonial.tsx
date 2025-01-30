import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

import { Section, type PastelColor } from "@/components/ui/Section";
import { Quote } from "@/components/ui/Quote";
import { Stack } from "@/components/ui/Stack";
import { Person } from "@/components/ui/Person";

type SectionTestimonialProps = {
    quote: string;
    personName: string;
    personDescription?: string;
    personImageSrc: string;
    personImageAlt?: string;
    background?: PastelColor;
    border?: boolean;
} & ComponentPropsWithoutRef<"section">;

/**
 * Section component for displaying a testimonial with quote and person information
 */
export const SectionTestimonial = ({
    quote,
    personName,
    personDescription,
    personImageSrc,
    personImageAlt,
    background,
    border,
    className,
    ...props
}: SectionTestimonialProps) => {
    return (
        <Section
            background={background}
            border={border}
            className={twMerge("py-12", className)}
            {...props}
        >
            <Stack space={6} className="max-w-3xl mx-auto">
                <Quote
                    cite={
                        <Person
                            name={personName}
                            description={personDescription}
                            imageSrc={personImageSrc}
                            imageAlt={personImageAlt}
                            className="justify-center"
                        />
                    }
                >
                    {quote}
                </Quote>
            </Stack>
        </Section>
    );
}; 