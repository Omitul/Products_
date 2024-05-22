"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const variantJoiSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    value: joi_1.default.string().required(),
});
const inventoryJoiSchema = joi_1.default.object({
    quantity: joi_1.default.number().required(),
    inStock: joi_1.default.boolean().required(),
});
const productJoiSchema = joi_1.default.object({
    name: joi_1.default.string().required().max(100),
    description: joi_1.default.string().required().max(100),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    tags: joi_1.default.array().items(joi_1.default.string()).required(),
    variants: joi_1.default.array().items(variantJoiSchema).required(),
    inventory: inventoryJoiSchema.required(),
});
exports.default = productJoiSchema;
