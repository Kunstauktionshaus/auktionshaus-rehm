import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    name: z.string().nonempty(),
    surname: z.string().nonempty(),
    birthday: z.date().optional(),
    firma: z.string().optional(),
    iban: z.string().optional(),
    street: z.string().nonempty(),
    plz: z.string().nonempty(),
    city: z.string().nonempty(),
    countryCode: z.string().nonempty(),
    phone: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
    privacyPolicy: z.literal(true),
    terms: z.literal(true),
    // isVerified: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

export const NinoxRegisterFormSchema = z.object({
  D: z.string().nonempty(),
  E: z.string().nonempty(),
  A2: z.date().optional(),
  W: z.string().optional(),
  L: z.string().optional(),
  R: z.string().nonempty(),
  T: z.string().nonempty(),
  U: z.string().nonempty(),
  C2: z.string().nonempty(),
  P: z.string().nonempty(),
  I: z.string().email(),
  E2: z.string().min(6),
  I2: z.literal(true),
  H2: z.literal(true),
  G2: z.boolean(),
  J2: z.string(),
  T2: z.string(),
});

export type NinoxRegisterFormValues = z.infer<typeof NinoxRegisterFormSchema>;
