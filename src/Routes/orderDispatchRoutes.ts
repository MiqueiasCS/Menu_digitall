import { Router } from "express";
import {
  createOrderDispatch,
  orderDispatchList,
  getOrdersDispatchListByTable,
  updateOrderDispatch,
} from "../Controllers/orderDispatchController";
import { validateDataSchema } from "../Middlewares/validateDataSchema";
import { dispatchSchema, updateDispatchSchema } from "../Schemas/dispatchSchema";

const router = Router();

export const orderDispatchRouter = () => {
  router.post("", validateDataSchema(dispatchSchema), createOrderDispatch);
  router.get("", orderDispatchList);
  router.get("/table/:id", getOrdersDispatchListByTable);
  router.patch("/:id", validateDataSchema(updateDispatchSchema), updateOrderDispatch);

  return router;
};
