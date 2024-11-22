import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const result = await OrderServices.createOrderIntoDB(orderData);

    //send response
    res.status(200).json({
      success: true,
      message: "Order is created Successfully",
      data: result,
    });
  } catch (err: unknown) {
    let statusCode = 500;
    let errorMessage = "Something went wrong";

    if (err instanceof Error) {
      errorMessage = err.message;
      if (err.message.includes("Insufficient stock")) {
        statusCode = 400;
      }
    }
    res.status(statusCode).json({
      message: errorMessage,
      success: false,
      error: err,
    });
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
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDB(orderId);

    res.status(200).json({
      status: true,
      message: "Order retrieved Successfully",
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

//update data
const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const body = req.body;
    const result = await OrderServices.updateOrderInDB(orderId, body);

    res.send({
      status: true,
      message: "Order updated successfully",
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.send({
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    await OrderServices.deleteOrderInDB(orderId);

    res.send({
      success: true,
      message: "Order deleted successfully",
      data: {},
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.send({
      message: errorMessage,
      status: false,
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
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.send({
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalRevenue,
};
