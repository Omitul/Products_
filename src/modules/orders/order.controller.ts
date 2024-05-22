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
      Product?.inventory.quantity < OrderData.quantity
    ) {
      return res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }

    const { value: JoiParsedData } = orderJoiSchema.validate(OrderData);

    ///quantity decreasing after order, also update
    const result = await OrderServices.CreateOrderintoDb(JoiParsedData);
    if (Product && Product.inventory && Product.inventory.quantity) {
      const StockOut = OrderData.quantity;
      Product.inventory.quantity = Math.max(
        Product.inventory.quantity - StockOut,
        0,
      ); // negative e jacchilo, cannot be less than 0

      await Product.save();
      if (Product?.inventory.quantity == 0) {
        Product.inventory.inStock = false;
        await Product.save();
      }
    }
    //send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: unknown) {
    console.log('check');
    return res.status(500).json({
      success: false,
      message: 'failed to create Order',
      error: err,
    });
  }
};

const GetOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    //console.log(email);
    //console.log('asfasfsaf');
    const result = await OrderServices.getOrders(email as string);

    if (email) {
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Orders fetched successfully for user email!`,
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Order not found',
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetched succesfully!',
        data: result,
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: 'Order not found or could not created!',
      error: err,
    });
  }
};

export const OrderController = {
  CreateOrder,
  GetOrders,
};
