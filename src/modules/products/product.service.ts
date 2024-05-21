import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getProducts = async (searchTerm: String) => {
  let product = {};
  if (searchTerm) {
    product = { name: { $regex: searchTerm.trim(), $options: 'i' } }; // what if there is a mistaken space, so trim lagbe
  }
  //console.log(product);

  const result = await ProductModel.find(product);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProducts,
};
