import { model, Schema } from "mongoose";
import { TOrder } from "./orders.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [
        true,
        "Email is required. Please provide a valid email address for the order.",
      ],
    },
    car: {
      type: String,
      required: [
        true,
        "Car selection is required. Please specify which car you are ordering.",
      ],
    },
    quantity: {
      type: Number,
      required: [
        true,
        "Quantity is required. Please specify the number of cars you want to order.",
      ],
    },
    totalPrice: {
      type: Number,
      required: [
        true,
        "Total price is required. Please provide the total price for the order.",
      ],
    },
  },
  { timestamps: true }
);

export const OrderModel = model<TOrder>("order", orderSchema);
