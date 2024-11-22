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

const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);

    res.status(200).json({
      status: true,
      message: "Car retrieved Successfully",
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
const updateCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const body = req.body;
    const result = await CarServices.updateCarInDB(carId, body);

    res.send({
      status: true,
      message: "Car updated successfully",
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

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
};
