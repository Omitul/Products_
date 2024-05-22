import { Orders } from './order.interface';
import { OrderModel } from './order.model';

const CreateOrderintoDb = async (OrderData: Orders) => {
  const result = await OrderModel.create(OrderData);
  return result;
};

const getOrders = async (email: string) => {
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
