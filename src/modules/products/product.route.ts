import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/api/products', ProductController.CreateProduct);
router.get('/api/products', ProductController.GetProducts);

export const ProductRoutes = router;
