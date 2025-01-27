import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type CardProps = {
  children: ReactNode;
  variant?: "default" | "glass" | "secondary";
  spacing?: "default" | "form";
  href?: string;
  hover?: boolean;
} & ComponentPropsWithoutRef<"div">;

type CardFormFieldsProps = ComponentPropsWithoutRef<"div">;
type CardFormFieldProps = ComponentPropsWithoutRef<"div">;

const CardRoot = ({
  children,
  variant = "default",
  spacing = "default",
  href,
  hover = true,
  className,
  ...props
}: CardProps) => {
  const cardClasses = twMerge(
    "rounded-3xl relative overflow-hidden",
    variant === "default" && [
      "bg-background border border-border",
      hover && "hover:bg-secondary/5 hover:scale-[1.02] hover:shadow-lg",
    ],
    variant === "glass" && [
      "glass-card border-2 border-primary/20 dark:border-primary/10",
      hover && "hover:scale-[1.02] hover:shadow-lg",
    ],
    variant === "secondary" && [
      "bg-secondary/20 dark:bg-secondary/10 border border-border",
      hover && "hover:bg-secondary/30 hover:scale-[1.02] hover:shadow-lg",
    ],
    spacing === "default" && "p-8",
    spacing === "form" && "p-12 space-y-8",
    className,
  );

  const content = (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="group">
        {content}
      </Link>
    );
  }

  return content;
};

const CardFormFields = ({ className, ...props }: CardFormFieldsProps) => (
  <div className={twMerge("space-y-6", className)} {...props} />
);

const CardFormField = ({ className, ...props }: CardFormFieldProps) => (
  <div className={twMerge("", className)} {...props} />
);

export const Card = Object.assign(CardRoot, {
  FormFields: CardFormFields,
  FormField: CardFormField,
});

/* Common text styles */
export const CardTitle = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) => (
  <Heading level="h3" className={twMerge("mb-4", className)} {...props}>
    {children}
  </Heading>
);

export const CardDescription = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) => (
  <Text variant="muted" className={twMerge("mb-6", className)} {...props}>
    {children}
  </Text>
);

export const CardList = ({
  items,
  className,
  bulletStyle = "dot",
  ...props
}: {
  items: string[];
  bulletStyle?: "dot" | "check";
} & ComponentPropsWithoutRef<"ul">) => (
  <ul className={twMerge("space-y-2", className)} {...props}>
    {items.map((item) => (
      <li key={item} className="flex items-start">
        <span className="text-primary mr-2">
          {bulletStyle === "check" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            "•"
          )}
        </span>
        <Text variant="muted">{item}</Text>
      </li>
    ))}
  </ul>
);
