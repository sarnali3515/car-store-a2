import express from "express";
import { CarController } from "./car.controller";

const router = express.Router();

//controller needed

router.post("/", CarController.createCar);

export const CarRoute = router;
