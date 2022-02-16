import { Express } from "express";
import { billRouter } from "./billRoutes";
import { productRouter } from "./productRoutes";
import { userRouter } from "./userRoutes";

export const initializerRouter = (app: Express) => {
  app.use("/api/product", productRouter());
  app.use("/api/user", userRouter());
  app.use("/api/bill", billRouter());
};
