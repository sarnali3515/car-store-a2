import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

//controller needed
router.get("/revenue", OrderController.getTotalRevenue);
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:orderId", OrderController.getSingleOrder);
router.put("/:orderId", OrderController.updateOrder);
router.delete("/:orderId", OrderController.deleteOrder);

export const OrderRoute = router;
