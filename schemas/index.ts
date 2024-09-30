import * as z from "zod";

export const BidderFiltersSchema = z.object({
  A: z.string().trim(),
  B: z.string().trim(),
  E: z.string().email("Invalid email address"),
});

export const ObjectsFiltersSchema = z.object({
  U2: z.string(),
  C1: z.string(),
});

export const BidderItemsSchema = z.object({
  id: z.number(),
  catalogNumber: z.number(),
  headerDE: z.string(),
  headerEN: z.string().optional(),
  price: z.number(),
  canBeShipped: z.boolean().optional(),
});

export const BidderItemsArraySchema = z.array(BidderItemsSchema);

export const SessionObjectSchema = z.object({
  id: z.number(),
  auctionNumber: z.number(),
  bidderNumber: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  notEU: z.boolean(),
  shippingCase: z.number().optional(),
  priceForShipping: z.number().optional(),
  provisionSt: z.number().optional(),
  provisionPl: z.number().optional(),
  isItemsPaid: z.boolean().optional(),
  objects: BidderItemsArraySchema,
});

export const PickupFormSchema = z.object({
  method: z.literal("1"),
  pickupDate: z.date(),
  pickupInfo: z.string(),
  comments: z.string(),
});

export const ShippingFormSchema = z.object({
  method: z.literal("2"),
  address: z.string(),
  postalCode: z.string(),
  city: z.string(),
  country: z.string(),
  comments: z.string(),
});

export const MailboxesFormSchema = z.object({
  method: z.literal("4"),
  comments: z.string(),
});

export const CombinedFormSchema = z.union([
  PickupFormSchema,
  ShippingFormSchema,
  MailboxesFormSchema,
]);
