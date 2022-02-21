import { NextFunction, Request, Response } from "express";
import {
  createBillService,
  GetBillService,
  GetTableBillsService,
} from "../Services/billService";

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

export const getBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    const bill = await GetBillService(orderId);

    return res.status(200).json(bill);
  } catch (err) {
    next(err);
  }
};

export const GetTableBills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tableId = req.params.tableId;

    const bills = await GetTableBillsService(tableId);

    return res.status(200).json(bills);
  } catch (err) {
    next(err);
  }
};
