import * as z from "zod";

export const EditProfileFormSchema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  company: z.object({
    companyName: z.string().optional(),
    iban: z.string().optional(),
  }),
  phone: z.string().nonempty(),
  email: z.string().email(),
  mainAddress: z.object({
    address: z.string().nonempty(),
    address2: z.string().optional(),
    plz: z.string().nonempty(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
  }),
});

export type EditProfileFormValues = z.infer<typeof EditProfileFormSchema>;

export const NinoxEditUserAddressFormSchema = z.object({
  W: z.string().optional(),
  L: z.string().optional(),
  R: z.string().nonempty(),
  W2: z.string().optional(),
  T: z.string().nonempty(),
  U: z.string().nonempty(),
  C2: z.string().nonempty(),
  B2: z.string().nonempty(),
  P: z.string().nonempty(),
});

export type NinoxEditUserAddressFormValues = z.infer<
  typeof NinoxEditUserAddressFormSchema
>;
