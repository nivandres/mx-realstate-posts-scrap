import { z } from "zod";

export const ImageSchema = z.object({
  title: z.string().optional(),
  url: z.string().url(),
});
export type Image = z.infer<typeof ImageSchema>;

export const providers = ["lamudi"] as const;

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["sale", "rent"]).optional(),
  provider: z.enum(providers).optional(),
  url: z.string().url().optional(),
  whatsapp: z
    .string()
    .regex(/^\+\d+$/)
    .optional(),
  phone: z
    .string()
    .regex(/^\+\d+$/)
    .optional(),
  city: z.string().optional(),
  price: z.number().optional(),
  images: z.array(ImageSchema).optional(),
  publisher: z.string().optional(),
  propertyType: z.array(z.string()).optional(),
  propertyFeatures: z.array(z.string()).optional(),
  propertyPlants: z.number().optional(),
  propertyArea: z.number().optional(),
  propertyRooms: z.number().optional(),
  propertyBathrooms: z.number().optional(),
  payload: z.unknown().optional(),

  input: z.string().optional(),
  page: z.number().optional(),
  providers: z.array(z.enum(providers)).optional(),
});
export type Post = z.infer<typeof PostSchema>;
