import { Router } from "express";
import { createBill, getBill } from "../Controllers/billController";

const router = Router();

export const billRouter = () => {
  router.post("/bill", createBill);
  router.get("/:orderId/bill", getBill);

  return router;
};
