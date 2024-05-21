import cors from 'cors';
import express, { Request, Response } from 'express';
import { ProductRoutes } from './modules/products/product.route';
const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/', ProductRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;
