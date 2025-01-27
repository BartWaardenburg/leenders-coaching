"use client";

import { useTheme } from "next-themes";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import { uiConfig } from "@/config/ui.config";
import { iconPaths } from "@/config/icons.config";

type ThemeToggleButtonProps = {
  className?: string;
};

/**
 * Button to toggle between light and dark theme
 */
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 absolute inset-0 m-auto rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={iconPaths.theme.sun}
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 absolute inset-0 m-auto rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={iconPaths.theme.moon}
    />
  </svg>
);

export const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  className,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={twMerge(
        "w-9 h-9 p-0 rounded-full relative",
        "hover:bg-secondary/10",
        className,
      )}
      aria-label={uiConfig.themeToggle.label}
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
};
