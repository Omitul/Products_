import { Response, Request } from 'express';
import orderJoiSchema from './order.validationJoi';
import { OrderServices } from './order.service';
import { ProductModel } from '../products/product.model';

const CreateOrder = async (req: Request, res: Response) => {
  try {
    const OrderData = req.body;
    const Product = await ProductModel.findOne({ _id: OrderData.productId });
    if (!Product || Product.inventory.inStock == false) {
      res.status(404).json({
        success: false,
        message: 'Order Not Found',
      });
    }

    /// inventory exists kore kina age check
    if (
      Product?.inventory &&
      Product?.inventory.quantity <= OrderData.quantity
    ) {
      res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    const { value: JoiParsedData, error } = orderJoiSchema.validate(OrderData);

    ///quantity decreasing after order, also update
    const result = await OrderServices.CreateOrderintoDb(JoiParsedData);
    if (Product && Product.inventory && Product.inventory.quantity) {
      const StockOut = OrderData.quantity;
      Product.inventory.quantity = Product.inventory.quantity - StockOut;
      await Product.save();
      if (Product?.inventory.quantity == 0) {
        Product.inventory.inStock = false;
        await Product.save();
      }
    }
    //send response

    res.status(200).json({
      success: true,
      message: 'Order is created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log('check');
    res.status(500).json({
      success: false,
      message: 'failed to create Order',
      error: error.message,
    });
  }
};

export const OrderController = {
  CreateOrder,
};
