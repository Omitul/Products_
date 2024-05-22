import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productJoiSchema from './product.validationJoi';

const CreateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const { value: JoiParsedData } = productJoiSchema.validate(productData);
    // console.log(error);

    const result = await ProductServices.createProductIntoDB(JoiParsedData);

    //send response

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    //console.log('ahare');
    res.status(500).json({
      success: false,
      message: 'failed to create product',
      error: err,
    });
  }
};

const GetProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const result = await ProductServices.getProducts(searchTerm as string);
    //console.log(result.length);

    if (searchTerm && result.length > 0) {
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}'  fetched successfully!`,
        data: result,
      });
    } else if (result.length > 0) {
      res.status(500).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Products could not be fetched or no items like this!',
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Products could not be fetched!!!',
      error: err,
    });
  }
};

const GetSingleProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.findSingleProductById(
      req.params.productId.trim(),
    );
    ////console.log(result);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'There is no product with this id',
      error: err,
    });
  }
};
const UpdateSingleProduct = async (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    const { value: JoiParsedData } = productJoiSchema.validate(updatedData);
    const result = await ProductServices.updateProduct(
      req.params.productId.trim(),
      JoiParsedData,
    );
    /////console.log(result);
    if (result.modifiedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'product updated succesfully!',
        data: updatedData,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          'There is no product with this id or product could not be updated',
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message:
        'There is no product with this id or product could not be updated',
      errro: err,
    });
  }
};

const deleteProductFromDb = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.deleteProduct(
      req.params.productId.trim(),
    );
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Product Could not be deleted or no product exists like this!',
      });
    }
  } catch (err: unknown) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: 'Product Could not be deleted',
      error: err,
    });
  }
};

export const ProductController = {
  CreateProduct,
  GetProducts,
  GetSingleProduct,
  UpdateSingleProduct,
  deleteProductFromDb,
};
