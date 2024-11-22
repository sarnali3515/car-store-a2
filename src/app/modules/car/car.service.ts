import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarFromDB = async () => {
  const result = await CarModel.find();
  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await CarModel.findOne({ id });
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
};
