import express from 'express';

const router = express.Router();

router.post('/api/products', ProductController.createProduct);

export const ProductRoutes = router;
