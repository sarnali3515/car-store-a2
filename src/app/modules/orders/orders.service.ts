import { CarModel } from "../cars/car.model";
import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const createOrderIntoDB = async (order: TOrder) => {
  const { car, quantity } = order;

  // Fetch car details
  const carDetails = await CarModel.findById(car);

  if (!carDetails) {
    throw new Error("Car not found");
  }

  // stock check
  if (carDetails.quantity < quantity) {
    throw new Error(
      `Insufficient stock. Only ${carDetails.quantity} cars are available.`,
    );
  }

  // update car inventory
  carDetails.quantity -= quantity;
  if (carDetails.quantity === 0) {
    carDetails.inStock = false;
  }
  await carDetails.save();

  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const getSingleOrderFromDB = async (_id: string) => {
  const result = await OrderModel.findOne({ _id });
  return result;
};

const updateOrderInDB = async (_id: string, updatedData: Partial<TOrder>) => {
  const result = await OrderModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOrderInDB = async (_id: string) => {
  const result = await OrderModel.findByIdAndDelete(_id, {
    new: true,
  });
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
  getSingleOrderFromDB,
  updateOrderInDB,
  deleteOrderInDB,
  calculateRevenue,
};
