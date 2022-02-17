import { Router } from "express";
import { createBill, getBill } from "../Controllers/billController";

const router = Router();

export const billRouter = () => {
  router.post("", createBill);
  router.get("/:orderId", getBill);

  return router;
};
