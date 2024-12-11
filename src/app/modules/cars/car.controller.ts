import { Request, Response } from "express";
import { CarServices } from "./car.service";

const createCar = async (req: Request, res: Response) => {
  try {
    const carData = req.body;

    // service func
    const result = await CarServices.createCarIntoDB(carData);

    //send response
    res.status(200).json({
      success: true,
      message: "Car created Successfully",
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
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
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

const getSingleCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);

    if (!result) {
      res.status(404).json({
        message: "Car not found",
        status: false,
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Car retrieved Successfully",
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

//update data
const updateCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const body = req.body;
    const result = await CarServices.updateCarInDB(carId, body);
    if (!result) {
      res.status(404).json({
        message: "Car not found",
        status: false,
      });
      return;
    }
    res.send({
      message: "Car updated successfully",
      status: true,
      data: result,
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
    });
  }
};

const deleteCar = async (req: Request, res: Response) => {
  try {
    const carId = req.params.carId;
    const result = await CarServices.deleteCarInDB(carId);
    if (!result) {
      res.status(404).json({
        message: "Car not found",
        status: false,
      });
      return;
    }

    res.send({
      message: "Car deleted successfully",
      success: true,
      data: {},
    });
  } catch (err: unknown) {
    let errorMessage = "Something went wrong";
    let stackTrace = null;

    if (err instanceof Error) {
      errorMessage = err.message;
      stackTrace = err.stack;
    }

    res.status(500).json({
      message: errorMessage,
      status: false,
      error: err,
      stack: stackTrace,
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
