import Joi from 'joi';

const orderJoiSchema = Joi.object({
  email: Joi.string().required().max(40),
  ProductId: Joi.string().required().max(40),
  price: Joi.string().required(),
  quantity: Joi.string().required(),
});

export default orderJoiSchema;
