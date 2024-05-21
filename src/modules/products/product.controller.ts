import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import ProductZodSchema from './product.validationZod';

const CreateProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    console.log(req.body);

    //const zodParsedData = ProductZodSchema.parse(req.body);
    console.log('ekhane ashe nai?');

    const result = await ProductServices.createProductIntoDB(req.body);
    console.log('etai');

    //send response

    res.status(200).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    });
  } catch (err: any) {
    console.log('ahare');
    res.status(500).json({
      success: false,
      message: 'failed to create student',
      error: err.message,
    });
  }
};

export const ProductController = {
  CreateProduct,
};
