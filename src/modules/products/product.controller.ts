import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiSchema from './product.validationJoi';

const CreateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { value: JoiParsedData, error } =
      productJoiSchema.validate(productData);
    console.log(error);

    const result = await ProductServices.createProductIntoDB(JoiParsedData);

    //send response

    res.status(200).json({
      success: true,
      message: 'product is created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log('ahare');
    res.status(500).json({
      success: false,
      message: 'failed to create student',
      error: error.message,
    });
  }
};

const GetProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getProducts(searchTerm as string);

    if (searchTerm) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}'  fetched successfully!`,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'products fetched succesfully',
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const ProductController = {
  CreateProduct,
  GetProducts,
};
