import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import logoColor from "@/assets/images/logo-color.png";
import logoWhite from "@/assets/images/logo-white.png";

/**
 * Logo component that switches between color and white variants based on theme
 * Uses a fixed aspect ratio container to ensure consistent cropping
 */
export const Logo = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Link
            href="/"
            className="relative block w-52 aspect-[3.5/1] overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src={isDark ? logoWhite : logoColor}
                    alt="Simone Leenders Coaching"
                    width={400}
                    height={133}
                    className="object-cover w-full scale-[1.5]"
                    priority
                />
            </div>
        </Link>
    );
}; 