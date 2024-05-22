"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/api/products', product_controller_1.ProductController.CreateProduct);
router.get('/api/products', product_controller_1.ProductController.GetProducts);
router.get('/api/products/:productId', product_controller_1.ProductController.GetSingleProduct);
router.put('/api/products/:productId', product_controller_1.ProductController.UpdateSingleProduct);
router.delete('/api/products/:productId', product_controller_1.ProductController.deleteProductFromDb);
exports.ProductRoutes = router;
