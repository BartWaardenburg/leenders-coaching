import Link from "next/link";
import { navigationConfig } from "@/config/navigation";
import { Box } from "@/components/ui/Box";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

type NavigationItemsProps = {
    onItemClick: () => void;
};

export const NavigationItems = ({ onItemClick }: NavigationItemsProps) => (
    <Box as="ul">
        <Stack space={4}>
            {navigationConfig.items.map((item) => (
                <Box as="li" key={item.href}>
                    <Link
                        href={item.href}
                        onClick={onItemClick}
                        className="block text-foreground hover:text-primary/80 transition-colors"
                    >
                        <Text
                            as="span"
                            variant="navigation"
                        >
                            {item.label}
                        </Text>
                    </Link>
                </Box>
            ))}
            <Box as="li">
                <Link
                    href={navigationConfig.cta.href}
                    onClick={onItemClick}
                    className="block text-primary hover:text-primary/80 transition-colors"
                >
                    <Text
                        as="span"
                        variant="navigation"
                    >
                        {navigationConfig.cta.label}
                    </Text>
                </Link>
            </Box>
        </Stack>
    </Box>
); 