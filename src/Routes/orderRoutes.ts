import { Router } from "express";
import { createOrder } from "../Controllers/orderController";

const router = Router();

export const orderRouter = () => {
  router.post(
    "",

    createOrder
  );

  return router;
};
