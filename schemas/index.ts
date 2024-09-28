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

export const SessionObjectSchema = z.object({
  id: z.number(),
  auctionNumber: z.number(),
  bidderNumber: z.number(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  priceForShipping: z.number().optional(),
  provisionSt: z.number().optional(),
  provisionPl: z.number().optional(),
  isItemsPaid: z.boolean().optional(),
  objects: z
    .array(
      z.object({
        id: z.number(),
        catalogNumber: z.number(),
        header: z.string(),
        price: z.number(),
      }),
    )
    .nonempty("Objects list cannot be empty"),
});
