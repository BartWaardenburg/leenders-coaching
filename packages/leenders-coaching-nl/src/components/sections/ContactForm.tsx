"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { FC } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type ContactFormProps = {
  onSubmit?: (data: ContactFormData) => Promise<void>;
};

/**
 * Contact form component with validation and loading states
 */
export const ContactForm: FC<ContactFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmitForm = async (data: ContactFormData) => {
    try {
      setStatus("loading");
      await onSubmit?.(data);
      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      console.error("Form submission error:", error);
    }
  };

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          {status === "success" && (
            <Alert variant="success" className="mb-6">
              Your message has been sent successfully!
            </Alert>
          )}
          {status === "error" && (
            <Alert variant="error" className="mb-6">
              There was an error sending your message. Please try again.
            </Alert>
          )}

          <Card variant="glass" spacing="form">
            <Card.FormFields>
              <Card.FormField>
                <Input
                  label="Name"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </Card.FormField>
              <Card.FormField>
                <Input
                  type="email"
                  label="Email"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </Card.FormField>
              <Card.FormField>
                <Input
                  as="textarea"
                  label="Message"
                  error={errors.message?.message}
                  {...register("message")}
                />
              </Card.FormField>
            </Card.FormFields>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </Card>
        </form>
      </div>
    </Section>
  );
};
