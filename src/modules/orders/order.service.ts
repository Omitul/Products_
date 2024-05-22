import { Orders } from './order.interface';
import { OrderModel } from './order.model';

const CreateOrderintoDb = async (OrderData: Orders) => {
  try {
    const result = await OrderModel.create(OrderData);
    return result;
  } catch (err) {
    throw err;
  }
};

const getOrders = async (email: String) => {
  let order = {};
  if (email) {
    //console.log('asche yes');
    order = { email: { $regex: email.trim(), $options: 'i' } };
  }

  const result = await OrderModel.find(order);
  return result;
};

export const OrderServices = {
  CreateOrderintoDb,
  getOrders,
};
