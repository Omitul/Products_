import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/api/products', ProductController.CreateProduct);
router.get('/api/products', ProductController.GetProducts);
router.get('/api/products/:productId', ProductController.GetSingleProduct);
router.put('/api/products/:productId', ProductController.UpdateSingleProduct);

export const ProductRoutes = router;
