import Link from "next/link";
import { FiLinkedin, FiInstagram } from "react-icons/fi";
import { Text } from "@/components/ui/Text";
import { menuFooterConfig } from "@/config/footer";
import { Heading } from "../Heading";

type FooterSectionProps = {
    title: string;
    children: React.ReactNode;
    isLast?: boolean;
};

const FooterSection = ({ title, children, isLast = false }: FooterSectionProps) => (
    <div className="flex flex-col">
        <Heading level="h3" variant="menu" spacing="none" className="mb-6 sm:px-0 md:px-4">
            {title}
        </Heading>
        <div className={`border-t ${!isLast ? 'md:border-r' : ''} border-foreground/80 pt-4 sm:px-0 md:px-4 pb-8 h-full`}>
            {children}
        </div>
    </div>
);

type SocialLinkProps = {
    href: string;
    label: string;
};

const SocialLink = ({ href, label }: SocialLinkProps) => (
    <Link
        href={href}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
    >
        {label}
        {label.toLowerCase() === "linkedin" ? (
            <FiLinkedin className="w-5 h-5" />
        ) : (
            <FiInstagram className="w-5 h-5" />
        )}
    </Link>
);

export const MenuFooter = () => {
    const { sections } = menuFooterConfig;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <FooterSection title={sections.about.title}>
                    <Text variant="muted" className="text-sm">
                        {sections.about.description}
                    </Text>
                </FooterSection>

                <FooterSection title={sections.elsewhere.title}>
                    <ul className="space-y-4">
                        {sections.elsewhere.items.map((item) => (
                            <li key={item.href}>
                                <SocialLink href={item.href} label={item.label} />
                            </li>
                        ))}
                    </ul>
                </FooterSection>

                <FooterSection title={sections.contact.title} isLast>
                    <div>
                        <div className="mb-4">
                            <span className="text-sm">{sections.contact.projectEnquiry.label} /</span>
                            <Link
                                href={sections.contact.projectEnquiry.href}
                                className="text-sm underline hover:text-primary transition-colors ml-1"
                            >
                                {sections.contact.projectEnquiry.linkText}
                            </Link>
                        </div>
                        <div>
                            <span className="text-sm">{sections.contact.generalEnquiry.label} /</span>
                            <Link
                                href={sections.contact.generalEnquiry.href}
                                className="text-sm underline hover:text-primary transition-colors ml-1"
                            >
                                {sections.contact.generalEnquiry.linkText}
                            </Link>
                        </div>
                    </div>
                </FooterSection>
            </div>
            <div className="h-px bg-foreground/80" />
        </div>
    );
}; 