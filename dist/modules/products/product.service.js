"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const getProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let product = {};
    if (searchTerm) {
        product = { name: { $regex: searchTerm.trim(), $options: 'i' } }; // what if there is a mistaken space, so trim lagbe
    }
    //console.log(product);
    const result = yield product_model_1.ProductModel.find(product);
    return result;
});
const findSingleProductById = (ProductId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ProductId);
    const product = yield product_model_1.ProductModel.findById(ProductId);
    return product;
});
const updateProduct = (ProductId, UpdatedData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ProductId);
    const product = yield product_model_1.ProductModel.updateOne({ _id: ProductId }, UpdatedData);
    return product;
});
const deleteProduct = (ProductId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(ProductId);
    const product = yield product_model_1.ProductModel.deleteOne({ _id: ProductId });
    return product;
});
exports.ProductServices = {
    createProductIntoDB,
    getProducts,
    findSingleProductById,
    updateProduct,
    deleteProduct,
};
