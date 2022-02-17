import { NextFunction, Request, Response } from "express";
import { createOrderDispatchService } from "../Services/ordedrDispatchService";

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
