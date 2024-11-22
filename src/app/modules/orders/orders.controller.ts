import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // service func
    const result = await OrderServices.createOrderIntoDB(order);

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
