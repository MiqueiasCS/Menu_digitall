import { Router } from "express";
import { createOrder } from "../Controllers/orderController";
import { validateDataSchema } from "../Middlewares/validateDataSchema";
import { orderSchema } from "../Schemas/orderSchema";

const router = Router();

export const orderRouter = () => {
  router.post("", validateDataSchema(orderSchema), createOrder);

  return router;
};
