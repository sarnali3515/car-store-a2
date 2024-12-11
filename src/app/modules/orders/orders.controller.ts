import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

// Create a Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const result = await OrderServices.createOrderIntoDB(orderData);
    //send response
    res.status(200).json({
      message: "Order created Successfully",
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    let statusCode = 500;
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
      if (err.message.includes("Insufficient stock")) {
        statusCode = 400;
      }
    }
    res.status(statusCode).json({
      message: errorMessage,
      success: false,
      error: err,
      stack: stackTrace,
    });
  }
};

// Get all Orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrderFromDB();
    res.status(200).json({
      message: "Orders retrieved successfully",
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

// Get single Order
const getSingleOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.getSingleOrderFromDB(orderId);
    if (!result) {
      res.status(404).json({
        message: "Order not found",
        status: false,
      });
      return;
    }
    res.status(200).json({
      message: "Order retrieved Successfully",
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

//update Order
const updateOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const body = req.body;
    const result = await OrderServices.updateOrderInDB(orderId, body);
    if (!result) {
      res.status(404).json({
        message: "Order not found",
        status: false,
      });
      return;
    }
    res.send({
      message: "Order updated successfully",
      success: true,
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

//Delete Order
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const result = await OrderServices.deleteOrderInDB(orderId);
    if (!result) {
      res.status(404).json({
        message: "Order not found",
        status: false,
      });
      return;
    }
    res.send({
      message: "Order deleted successfully",
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

// Total Revenue
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
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
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
