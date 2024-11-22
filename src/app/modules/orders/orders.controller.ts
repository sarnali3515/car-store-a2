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
      status: false,
      message: errorMessage,
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
  } catch (error) {
    res.send({
      status: false,
      message: "Something went wrong",
      error,
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
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error,
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
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getTotalRevenue,
};
