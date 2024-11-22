import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderIntoDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
