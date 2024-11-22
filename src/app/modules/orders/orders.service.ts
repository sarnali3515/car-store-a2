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

const calculateRevenue = async () => {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ];

  const result = await OrderModel.aggregate(pipeline);

  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  calculateRevenue,
};
