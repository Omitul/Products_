"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const orderJoiSchema = joi_1.default.object({
    email: joi_1.default.string().required().max(40),
    ProductId: joi_1.default.string().required().max(40),
    price: joi_1.default.string().required(),
    quantity: joi_1.default.string().required(),
});
exports.default = orderJoiSchema;
