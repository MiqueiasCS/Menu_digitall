import { NextFunction, Request, Response } from "express";
import { createOrderService } from "../Services/orderService";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await createOrderService(req.body);
    return res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
