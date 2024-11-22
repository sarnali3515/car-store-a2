import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, "Brand is required. Please provide the car's brand."],
    },
    model: {
      type: String,
      required: [true, "Model is required. Please provide the car's model."],
    },
    year: {
      type: Number,
      required: [
        true,
        "Year is required. Please provide the car's manufacturing year.",
      ],
      min: [0, "Year must be a positive number."],
    },
    price: {
      type: Number,
      required: [true, "Price is required. Please provide the car's price."],
      min: [0, "Price must be a positive number."],
    },
    category: {
      type: String,
      enum: {
        values: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
        message:
          "{VALUE} is not a valid category. Choose from Sedan, SUV, Truck, Coupe, or Convertible.",
      },
    },
    description: {
      type: String,
      required: [
        true,
        "Description is required. Please provide details about the car.",
      ],
    },
    quantity: {
      type: Number,
      required: [
        true,
        "Quantity is required. Please specify how many units are available.",
      ],
      min: [0, "Quantity must be a positive number."],
    },
    inStock: {
      type: Boolean,
      required: [
        true,
        "Stock status is required. Please indicate whether the car is in stock.",
      ],
      default: true,
    },
  },
  { timestamps: true }
);

export const CarModel = model<TCar>("car", carSchema);
