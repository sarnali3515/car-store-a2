import { Request, Response } from "express";
import { CarServices } from "./car.service";

const createCar = async (req: Request, res: Response) => {
  try {
    const car = req.body;

    // service func
    const result = await CarServices.createCarIntoDB(car);

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

export const CarController = {
  createCar,
};
