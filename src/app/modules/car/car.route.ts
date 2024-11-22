import express from "express";
import { CarController } from "./car.controller";

const router = express.Router();

//controller needed

router.post("/", CarController.createCar);
router.get("/", CarController.getAllCars);
router.get("/:carId", CarController.getSingleCar);
router.put("/:carId", CarController.updateCar);

export const CarRoute = router;
