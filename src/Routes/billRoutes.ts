import { Router } from "express";
import { createBill, getBill } from "../Controllers/billController";
import { validateDataSchema } from "../Middlewares/validateDataSchema";
import { billSchema } from "../Schemas/billSchema";

const router = Router();

export const billRouter = () => {
  router.post("/bill", validateDataSchema(billSchema), createBill);
  router.get("/:orderId/bill", getBill);

  return router;
};
