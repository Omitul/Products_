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

export const OrderServices = {
  CreateOrderintoDb,
};
