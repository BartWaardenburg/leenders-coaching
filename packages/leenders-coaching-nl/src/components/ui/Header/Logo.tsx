import Link from "next/link";
import { navigationConfig } from "@/config/navigation";

export const Logo = () => (
    <Link href="/" className="text-2xl font-playfair">
        {navigationConfig.brand.title}
    </Link>
); 