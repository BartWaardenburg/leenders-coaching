export const CONTACT_FORM_FIELDS = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    required: true,
    rows: 5,
  },
] as const;
