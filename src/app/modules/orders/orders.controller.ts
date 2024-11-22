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
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrderFromDB();

    res.status(200).json({
      status: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }

    res.status(500).json({
      status: false,
      message: errorMessage,
      error: err,
    });
  }
};

// revenue
const getTotalRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      status: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getTotalRevenue,
};
