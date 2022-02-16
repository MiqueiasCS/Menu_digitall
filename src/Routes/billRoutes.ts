import { Router } from "express";
import { createBill } from "../Controllers/billController";

const router = Router();

export const billRouter = () => {
  router.post("", createBill);

  return router;
};
