import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/api/orders', OrderController.CreateOrder);
router.get('/api/orders', OrderController.GetOrders);

export const OrderRoutes = router;
