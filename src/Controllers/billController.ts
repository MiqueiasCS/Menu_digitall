import { NextFunction, Request, Response } from "express";
import { createBillService } from "../Services/billService";

export const createBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bill = await createBillService(req.body);

    return res.status(201).json(bill);
  } catch (err) {
    next(err);
  }
};
