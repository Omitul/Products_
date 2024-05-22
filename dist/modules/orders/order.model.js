"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const orderschema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 40,
    },
    productId: {
        type: String,
        required: true,
        maxlength: 40,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
exports.OrderModel = (0, mongoose_1.model)('Orders', orderschema, 'OrdersDB'); // orderDB: where the orders will be stored in MONGO inside our PRODUCTBASE
