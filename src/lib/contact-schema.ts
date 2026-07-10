import { z } from "zod";

/**
 * Single source of truth for contact validation.
 * Imported by both the client form and the server route handler so the
 * two can never drift apart (Phase 8 gate: "shared zod schema client+server").
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(12, "Please share a bit more detail."),
  /**
   * Honeypot. Real users never see this field, so any non-empty value means a
   * bot filled it in. Kept in the schema as an optional string; rejection is
   * handled explicitly (not via validation error) so bots get a 200, not a hint.
   */
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
