import { Router } from "express";
import { createOrderDispatch } from "../Controllers/orderDispatchController";

const router = Router();

export const orderDispatchRouter = () => {
  router.post("", createOrderDispatch);

  return router;
};
