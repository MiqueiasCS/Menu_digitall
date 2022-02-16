import { NextFunction, Request, Response } from "express";
import { createTableService } from "../Services/tableService";

export const createTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const table = await createTableService(req.body);

    return res.status(201).json(table);
  } catch (err) {
    next(err);
  }
};
