import { z } from 'zod';
const VariantZodSchema = z.object({
  type: z.string(),
  value: z.string(),
});

const InventoryZodSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const ProductZodSchema = z.object({
  name: z.string().max(20),
  description: z.string().max(30),
  price: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  variant: z.array(VariantZodSchema),
  inventory: InventoryZodSchema,
});

export default ProductZodSchema;
