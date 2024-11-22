import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

//controller needed

router.post("/", OrderController.createOrder);

export const OrderRoute = router;
