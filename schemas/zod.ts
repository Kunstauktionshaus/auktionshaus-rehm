import * as z from "zod";

export const BidderFiltersSchema = z.object({
  A: z.string().trim().nonempty(),
  B: z.string().trim().nonempty(),
  E: z.string().email("Invalid email address"),
});

export type BidderFiltersValues = z.infer<typeof BidderFiltersSchema>;

export const ObjectsFiltersSchema = z.object({
  U2: z.string(),
  C1: z.string(),
});

export type ObjectsFiltersValues = z.infer<typeof ObjectsFiltersSchema>;

export const BidderItemsSchema = z
  .object({
    id: z.number(),
    catalogNumber: z.number(),
    headerDE: z.string(),
    headerEN: z.string().optional(),
    price: z.number(),
    canBeShipped: z.boolean().optional(),
  })
  .optional();

export type BidderItem = z.infer<typeof BidderItemsSchema>;

export const BidderItemsArraySchema = z.array(BidderItemsSchema).optional();

export const SessionObjectSchema = z.object({
  id: z.number(),
  method: z.number(),
  auctionNumber: z.number(),
  bidderNumber: z.number(),
  name: z.string().optional(),
  surname: z.string().optional(),
  notEU: z.boolean().optional(),
  shippingCase: z.number().optional(),
  priceForShipping: z.number().optional(),
  provisionSt: z.number().optional(),
  provisionPl: z.number().optional(),
  isItemsPaid: z.boolean().optional(),
  objects: BidderItemsArraySchema,
});

export type SessionObjectValues = z.infer<typeof SessionObjectSchema>;

export const PickupFormSchema = z.object({
  method: z.literal("1"),
  pickupDate: z.date(),
  pickupInfo: z.string().optional(),
  comments: z.string().optional(),
});

export const ShippingFormSchema = z.object({
  method: z.literal("2"),
  address: z.string().nonempty(),
  postalCode: z.string().nonempty(),
  city: z.string().nonempty(),
  country: z.string().nonempty(),
  comments: z.string().optional(),
  pickupDate: z.date().optional(),
  pickupInfo: z.string().optional(),
});

export const MailboxesFormSchema = z.object({
  method: z.literal("4"),
  comments: z.string().optional(),
});

export const CombinedFormSchema = z.discriminatedUnion("method", [
  PickupFormSchema,
  ShippingFormSchema,
  MailboxesFormSchema,
]);

export type ShippingFormValues = z.infer<typeof ShippingFormSchema>;
export type PickupFormValues = z.infer<typeof PickupFormSchema>;
export type MailboxesFormValues = z.infer<typeof MailboxesFormSchema>;

export type CombinedFormValues =
  | ShippingFormValues
  | PickupFormValues
  | MailboxesFormValues;

export const ConditionalFormSchema = z
  .object({
    N: z.union([z.literal("1"), z.literal("2"), z.literal("4")]),
    L: z.date().optional(),
    I: z.string().optional(),
    D2: z.string().optional(),
    C2: z.string().optional(),
    R4: z.string().optional(),
    N1: z.string().optional(),
    M: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.N === "2") {
      if (!data.I) {
        ctx.addIssue({
          path: ["I"],
          message: "Address is required for shipping method.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.C2) {
        ctx.addIssue({
          path: ["C2"],
          message: "City is required for shipping method.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.D2) {
        ctx.addIssue({
          path: ["D2"],
          message: "Postal Code is required for shipping method.",
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.R4) {
        ctx.addIssue({
          path: ["R4"],
          message: "Country is required for shipping method.",
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.N === "1") {
      if (!data.L) {
        ctx.addIssue({
          path: ["L"],
          message: "Pickup date is required for pickup method.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type ConditionalFormValues = z.infer<typeof ConditionalFormSchema>;
