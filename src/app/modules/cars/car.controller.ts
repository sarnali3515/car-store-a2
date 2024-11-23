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
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

const getAllCars = async (req: Request, res: Response) => {
  try {
    // search term from param
    const { searchTerm } = req.query;

    const result = await CarServices.getCarsBySearchTerm(searchTerm as string);

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
      message: errorMessage,
      status: false,
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
      message: errorMessage,
      status: false,
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
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.send({
      message: errorMessage,
      status: false,
      error: err,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    await CarServices.deleteCarInDB(carId);

    res.send({
      success: true,
      message: "Car deleted successfully",
      data: {},
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    res.send({
      message: errorMessage,
      success: false,
      error: err,
    });
  }
};

export const CarController = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
};
