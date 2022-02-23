import { Express } from "express";
import { billRouter } from "./billRoutes";
import { productRouter } from "./productRoutes";
import { userRouter } from "./userRoutes";
import { orderRouter } from "./orderRoutes";
import { tableRouter } from "./tableRoutes";
import { orderDispatchRouter } from "./orderDispatchRoutes";

export const initializerRouter = (app: Express) => {
  app.use("/api/product", productRouter());
  app.use("/api/user", userRouter());
  app.use("/api/order", billRouter());
  app.use("/api/order", orderRouter());
  app.use("/api/table", tableRouter());
  app.use("/api/dispatch", orderDispatchRouter());
};
