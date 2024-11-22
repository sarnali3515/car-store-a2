import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findOne({ id });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getSingleOrderFromDB,
};
