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
exports.OrderController = void 0;
const order_validationJoi_1 = __importDefault(require("./order.validationJoi"));
const order_service_1 = require("./order.service");
const product_model_1 = require("../products/product.model");
const CreateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OrderData = req.body;
        const Product = yield product_model_1.ProductModel.findOne({ _id: OrderData.productId });
        if (!Product || Product.inventory.inStock == false) {
            res.status(404).json({
                success: false,
                message: 'Order Not Found',
            });
        }
        /// inventory exists kore kina age check
        if ((Product === null || Product === void 0 ? void 0 : Product.inventory) &&
            (Product === null || Product === void 0 ? void 0 : Product.inventory.quantity) < OrderData.quantity) {
            return res.status(500).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        const { value: JoiParsedData } = order_validationJoi_1.default.validate(OrderData);
        ///quantity decreasing after order, also update
        const result = yield order_service_1.OrderServices.CreateOrderintoDb(JoiParsedData);
        if (Product && Product.inventory && Product.inventory.quantity) {
            const StockOut = OrderData.quantity;
            Product.inventory.quantity = Math.max(Product.inventory.quantity - StockOut, 0); // negative e jacchilo, cannot be less than 0
            yield Product.save();
            if ((Product === null || Product === void 0 ? void 0 : Product.inventory.quantity) == 0) {
                Product.inventory.inStock = false;
                yield Product.save();
            }
        }
        //send response
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        console.log('check');
        return res.status(500).json({
            success: false,
            message: 'failed to create Order',
            error: err,
        });
    }
});
const GetOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        //console.log(email);
        //console.log('asfasfsaf');
        const result = yield order_service_1.OrderServices.getOrders(email);
        if (email) {
            if (result.length > 0) {
                res.status(200).json({
                    success: true,
                    message: `Orders fetched successfully for user email!`,
                    data: result,
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Order not found',
                });
            }
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Orders fetched succesfully!',
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Order not found or could not created!',
            error: err,
        });
    }
});
exports.OrderController = {
    CreateOrder,
    GetOrders,
};
