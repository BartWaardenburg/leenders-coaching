import { Alert } from "@/components/ui/Alert";
import type { ComponentPropsWithoutRef } from "react";

type ContactFormStatus = "idle" | "loading" | "success" | "error";

type ContactFormAlertProps = {
  status: ContactFormStatus;
} & ComponentPropsWithoutRef<"div">;

/**
 * Alert component for contact form status messages
 */
export const ContactFormAlert = ({ status }: ContactFormAlertProps) => {
  if (status === "idle" || status === "loading") return null;

  return (
    <div className="animate-in zoom-in-50 duration-500">
      <Alert variant={status}>
        {status === "success"
          ? "Thank you for your message! I'll get back to you soon."
          : "Something went wrong. Please try again later."}
      </Alert>
    </div>
  );
};
