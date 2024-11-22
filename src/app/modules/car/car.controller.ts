import { Request, Response } from "express";
import { CarServices } from "./car.service";

const createCar = async (req: Request, res: Response) => {
  try {
    const { car: carData } = req.body;

    // service func
    const result = await CarServices.createCarIntoDB(carData);

    //send response
    res.status(200).json({
      success: true,
      message: "Car is created Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getAllCarFromDB();

    res.status(200).json({
      status: true,
      message: "Cars retrieved successfully",
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

export const CarController = {
  createCar,
  getAllCars,
};
