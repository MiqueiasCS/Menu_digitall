import { NextFunction, Request, Response } from "express";
import {
  createOrderDispatchService,
  getUnprocessedOrderDispatchListService,
  getAllOrderDispatchListService,
  getProcessedOrderDispatchListService,
  getOrderDispatchListByTableService,
  updateOrderDispatchService,
} from "../Services/orderDispatchService";

export const createOrderDispatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderDispatched = await createOrderDispatchService(req.body);
    return res.status(201).json(orderDispatched);
  } catch (err) {
    next(err);
  }
};

export const updateOrderDispatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderStatus } = req.body;
    const orderDispatchId = req.params.id;

    const orderDispatched = await updateOrderDispatchService(
      orderDispatchId,
      orderStatus
    );
    return res.status(200).json(orderDispatched);
  } catch (err) {
    next(err);
  }
};

export const orderDispatchList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let listType = req.query.type as string;

  try {
    if (listType === "all") {
      const allOrdersList = await getAllOrderDispatchListService();

      return res.status(200).json(allOrdersList);
    } else if (listType === "processed") {
      const processedOrdersList = await getProcessedOrderDispatchListService();

      return res.status(200).json(processedOrdersList);
    }

    const unprocessedOrders = await getUnprocessedOrderDispatchListService();
    return res.status(200).json(unprocessedOrders);
  } catch (err) {
    next(err);
  }
};

export const getOrdersDispatchListByTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let tableId = req.params.id;
  try {
    const orderDispatched = await getOrderDispatchListByTableService(tableId);
    return res.status(200).json(orderDispatched);
  } catch (err) {
    next(err);
  }
};
