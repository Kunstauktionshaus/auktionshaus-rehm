import * as z from "zod";

export const PrebidSchema = z.object({
  auction: z.string().nonempty(),
  bidderNumber: z.number().min(1),
  catalogNumber: z.number().min(1),
  maxBid: z.number().min(1),
});

export type PrebidValues = z.infer<typeof PrebidSchema>;

export const NinoxPrebidSchema = z.object({
  A: z.string().nonempty(),
  E: z.number().min(1),
  D: z.number().min(1),
  F: z.number().min(1),
});

export type NinoxPrebidValues = z.infer<typeof NinoxPrebidSchema>;
