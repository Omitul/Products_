import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', OrderController.CreateOrder);
console.log('asche');

export const OrderRoutes = router;
