import express, { Application, Request, Response } from "express";
import cors from "cors";
import { CarRoute } from "./app/modules/car/car.route";
import { OrderRoute } from "./app/modules/orders/orders.route";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

// application route
app.use("/api/cars", CarRoute);
app.use("/api/orders", OrderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Running Properly....");
});

export default app;
