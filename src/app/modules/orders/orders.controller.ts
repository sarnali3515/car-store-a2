import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    // service func
    const result = await OrderServices.createOrderIntoDB(orderData);

    //send response
    res.status(200).json({
      success: true,
      message: "Order is created Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const OrderController = {
  createOrder,
};
