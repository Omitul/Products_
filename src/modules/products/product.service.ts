import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (productData: Product) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getProducts = async (searchTerm: string) => {
  let product = {};
  if (searchTerm) {
    product = { name: { $regex: searchTerm.trim(), $options: 'i' } }; // what if there is a mistaken space, so trim lagbe
  }
  //console.log(product);

  const result = await ProductModel.find(product);
  return result;
};

const findSingleProductById = async (ProductId: string) => {
  console.log(ProductId);

  const product = await ProductModel.findById(ProductId);
  return product;
};

const updateProduct = async (ProductId: string, UpdatedData: JSON) => {
  console.log(ProductId);

  const product = await ProductModel.updateOne({ _id: ProductId }, UpdatedData);
  return product;
};

const deleteProduct = async (ProductId: string) => {
  console.log(ProductId);

  const product = await ProductModel.deleteOne({ _id: ProductId });
  return product;
};

export const ProductServices = {
  createProductIntoDB,
  getProducts,
  findSingleProductById,
  updateProduct,
  deleteProduct,
};
