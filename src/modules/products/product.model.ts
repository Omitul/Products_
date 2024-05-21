import { Schema, model } from 'mongoose';
import { Product } from './product.interface';

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    maxlength: 30,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },

  variant: {
    type: [
      {
        type: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    required: true,
  },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Number, required: true },
  },
});
