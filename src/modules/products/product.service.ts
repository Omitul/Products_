import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: Product) => {
  try {
    const result = await ProductModel.create(productData);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const ProductServices = {
  createProductIntoDB,
};
