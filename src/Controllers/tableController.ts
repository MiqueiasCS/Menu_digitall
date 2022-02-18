import { NextFunction, Request, Response } from "express";
import {
  createTableService,
  getAllTableService,
  getTableByNameService,
} from "../Services/tableService";

export const createTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const table = await createTableService(req.body.tableidentifier);

    return res.status(201).json(table);
  } catch (err) {
    next(err);
  }
};

export const getAllTable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tables = await getAllTableService();

    return res.status(200).json(tables);
  } catch (err) {
    next(err);
  }
};

export const getTableByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const table = await getTableByNameService(req.params.tableidentifier);

    return res.status(200).json(table);
  } catch (err) {
    next(err);
  }
};
