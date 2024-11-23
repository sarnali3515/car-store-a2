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

const getCarsBySearchTerm = async (searchTerm: string) => {
  // for all cars
  if (!searchTerm) {
    return CarModel.find();
  }

  // query
  const query = {
    $or: [
      { brand: { $regex: searchTerm, $options: "i" } },
      { model: { $regex: searchTerm, $options: "i" } },
      { category: { $regex: searchTerm, $options: "i" } },
    ],
  };

  const result = await CarModel.find(query);
  return result;
};

const getSingleCarFromDB = async (_id: string) => {
  const result = await CarModel.findOne({ _id });
  return result;
};

const updateCarInDB = async (_id: string, updatedData: Partial<TCar>) => {
  const result = await CarModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCarInDB = async (_id: string) => {
  const result = await CarModel.findByIdAndDelete(_id, {
    new: true,
  });
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getCarsBySearchTerm,
  getSingleCarFromDB,
  updateCarInDB,
  deleteCarInDB,
};
