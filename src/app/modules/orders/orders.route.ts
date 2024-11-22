import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

//controller needed

router.post("/orders", OrderController.createOrder);
