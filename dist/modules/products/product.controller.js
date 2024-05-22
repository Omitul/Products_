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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validationJoi_1 = __importDefault(require("./product.validationJoi"));
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const { value: JoiParsedData } = product_validationJoi_1.default.validate(productData);
        // console.log(error);
        const result = yield product_service_1.ProductServices.createProductIntoDB(JoiParsedData);
        //send response
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        //console.log('ahare');
        res.status(500).json({
            success: false,
            message: 'failed to create product',
            error: err,
        });
    }
});
const GetProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getProducts(searchTerm);
        //console.log(result.length);
        if (searchTerm && result.length > 0) {
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}'  fetched successfully!`,
                data: result,
            });
        }
        else if (result.length > 0) {
            res.status(500).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Products could not be fetched or no items like this!',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Products could not be fetched!!!',
            error: err,
        });
    }
});
const GetSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.findSingleProductById(req.params.productId.trim());
        ////console.log(result);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'There is no product with this id',
            error: err,
        });
    }
});
const UpdateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedData = req.body;
        const { value: JoiParsedData } = product_validationJoi_1.default.validate(updatedData);
        const result = yield product_service_1.ProductServices.updateProduct(req.params.productId.trim(), JoiParsedData);
        /////console.log(result);
        if (result.modifiedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'product updated succesfully!',
                data: updatedData,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'There is no product with this id or product could not be updated',
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'There is no product with this id or product could not be updated',
            errro: err,
        });
    }
});
const deleteProductFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.deleteProduct(req.params.productId.trim());
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Product Could not be deleted or no product exists like this!',
            });
        }
    }
    catch (err) {
        //console.log(err);
        res.status(500).json({
            success: false,
            message: 'Product Could not be deleted',
            error: err,
        });
    }
});
exports.ProductController = {
    CreateProduct,
    GetProducts,
    GetSingleProduct,
    UpdateSingleProduct,
    deleteProductFromDb,
};
