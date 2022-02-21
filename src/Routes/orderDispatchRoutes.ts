import { Router } from "express";
import {
  createOrderDispatch,
  orderDispatchList,
  getOrdersDispatchListByTable,
  updateOrderDispatch,
} from "../Controllers/orderDispatchController";

const router = Router();

export const orderDispatchRouter = () => {
  router.post("", createOrderDispatch);
  router.get("", orderDispatchList);
  router.get("/table/:id", getOrdersDispatchListByTable);
  router.patch("/:id", updateOrderDispatch);

  return router;
};
