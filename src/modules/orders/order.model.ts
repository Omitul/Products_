import { Schema, model } from 'mongoose';
import { Orders } from './order.interface';

const orderschema = new Schema<Orders>({
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

export const OrderModel = model<Orders>('Orders', orderschema, 'OrdersDB'); // orderDB: where the orders will be stored in MONGO inside our PRODUCTBASE
