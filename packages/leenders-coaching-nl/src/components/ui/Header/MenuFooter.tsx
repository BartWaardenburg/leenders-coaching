import Link from "next/link";
import { FiLinkedin, FiInstagram } from "react-icons/fi";
import { Text } from "@/components/ui/Text";
import { menuFooterConfig } from "@/config/footer.config";
import { Heading } from "@/components/ui/Heading";
import { Box } from "@/components/ui/Box";
import { Flex } from "@/components/ui/Flex";
import { Stack } from "@/components/ui/Stack";
import { Grid } from "@/components/ui/Grid";

type FooterSectionProps = {
    title: string;
    children: React.ReactNode;
    isLast?: boolean;
};

const FooterSection = ({ title, children, isLast = false }: FooterSectionProps) => (
    <Flex direction="column">
        <Heading level="h3" variant="small" spacing="none" className="mb-6 sm:px-0 md:px-4">
            {title}
        </Heading>
        <Box className={`border-t ${!isLast ? 'md:border-r' : ''} border-foreground/80 pt-4 sm:px-0 md:px-4 pb-8 h-full`}>
            {children}
        </Box>
    </Flex>
);

type SocialLinkProps = {
    href: string;
    label: string;
};

const SocialLink = ({ href, label }: SocialLinkProps) => (
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
        <Flex items="center" gap={2}>
            {label}
            {label.toLowerCase() === "linkedin" ? (
                <FiLinkedin className="w-5 h-5" />
            ) : (
                <FiInstagram className="w-5 h-5" />
            )}
        </Flex>
    </Link>
);

export const MenuFooter = () => {
    const { sections } = menuFooterConfig;

    return (
        <Box>
            <Grid columns={{ default: 1, md: 3 }} gap={0}>
                <FooterSection title={sections.about.title}>
                    <Text variant="muted" className="text-sm">
                        {sections.about.description}
                    </Text>
                </FooterSection>

                <FooterSection title={sections.elsewhere.title}>
                    <Box as="ul">
                        <Stack space={4}>
                            {sections.elsewhere.items.map((item) => (
                                <Box as="li" key={item.href}>
                                    <SocialLink href={item.href} label={item.label} />
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </FooterSection>

                <FooterSection title={sections.contact.title} isLast>
                    <Stack space={4}>
                        <Box>
                            <Text as="span" className="text-sm">{sections.contact.projectEnquiry.label} /</Text>
                            <Link
                                href={sections.contact.projectEnquiry.href}
                                className="text-sm underline hover:text-primary transition-colors ml-1"
                            >
                                {sections.contact.projectEnquiry.linkText}
                            </Link>
                        </Box>
                        <Box>
                            <Text as="span" className="text-sm">{sections.contact.generalEnquiry.label} /</Text>
                            <Link
                                href={sections.contact.generalEnquiry.href}
                                className="text-sm underline hover:text-primary transition-colors ml-1"
                            >
                                {sections.contact.generalEnquiry.linkText}
                            </Link>
                        </Box>
                    </Stack>
                </FooterSection>
            </Grid>
            <Box className="h-px bg-foreground/80" />
        </Box>
    );
}; 