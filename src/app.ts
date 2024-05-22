import cors from 'cors';
import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/orders/order.route';
const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/', ProductRoutes);
app.use('/', OrderRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;
