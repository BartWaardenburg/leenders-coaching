import Link from "next/link";
import { navigationConfig } from "@/config/navigation";

type NavigationItemsProps = {
    onItemClick: () => void;
};

export const NavigationItems = ({ onItemClick }: NavigationItemsProps) => (
    <ul className="mb-24">
        {navigationConfig.items.map((item) => (
            <li key={item.href} className="pb-4">
                <Link
                    href={item.href}
                    className="text-4xl font-playfair text-foreground hover:text-primary/80 transition-colors"
                    onClick={onItemClick}
                >
                    {item.label}
                </Link>
            </li>
        ))}
        <li className="pb-4">
            <Link
                href={navigationConfig.cta.href}
                className="text-4xl font-playfair text-primary hover:text-primary/80 transition-colors"
                onClick={onItemClick}
            >
                {navigationConfig.cta.label}
            </Link>
        </li>
    </ul>
); 