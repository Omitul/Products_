import Joi from 'joi';

const variantJoiSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

const inventoryJoiSchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

const productJoiSchema = Joi.object({
  name: Joi.string().required().max(100),
  description: Joi.string().required().max(100),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variant: Joi.array().items(variantJoiSchema).required(),
  inventory: inventoryJoiSchema.required(),
});

export default productJoiSchema;
