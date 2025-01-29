import Link from "next/link";
import { navigationConfig } from "@/config/navigation.config";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

type NavigationItemsProps = {
    onItemClick: () => void;
};

export const NavigationItems = ({ onItemClick }: NavigationItemsProps) => (
    <Box as="ul">
        <Stack space={4}>
            {navigationConfig.links.map((link) => (
                <Box as="li" key={link.href}>
                    <Link
                        href={link.href}
                        onClick={onItemClick}
                        className="block text-foreground hover:text-primary/80 transition-colors"
                    >
                        <Text
                            as="span"
                            variant="navigation"
                        >
                            {link.label}
                        </Text>
                    </Link>
                </Box>
            ))}
        </Stack>
    </Box>
); 