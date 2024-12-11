import { z } from "zod";

export const ObjectSchema = z.object({
  id: z.number(),
  auction: z.string(),
  catalogNumber: z.number(),
  category: z.number().optional(),
  headerDE: z.string(),
  headerEN: z.string(),
  descriptionDE: z.string(),
  descriptionEN: z.string(),
  catalogPrice: z.number(),
  soldPrice: z.number().optional(),
  highlight: z.boolean().optional(),
});

export type ObjectSchemaValues = z.infer<typeof ObjectSchema>;

export const ObjectsArraySchema = z.array(ObjectSchema);
export type ObjectsArrayValues = z.infer<typeof ObjectsArraySchema>;
