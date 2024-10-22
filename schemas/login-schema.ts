import * as z from "zod";

export const PasswordLoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6),
});

export type PasswordLoginFormValues = z.infer<typeof PasswordLoginFormSchema>;

export const CodeLoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6),
  password: z.string().min(6),
});

export type CodeLoginFormValues = z.infer<typeof CodeLoginFormSchema>;
