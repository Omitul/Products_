import Joi from 'joi';

const productJoiSchema = Joi.object({
  email: Joi.string().required().max(20),
  productId: Joi.string().required().max(20),
  price: Joi.string().required(),
  quantity: Joi.string().required(),
});
