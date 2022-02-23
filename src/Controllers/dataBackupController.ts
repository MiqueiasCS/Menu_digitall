import { NextFunction, Request, Response } from "express";
import { getBackupList } from "../Services/dataBackupService";

export const getAllData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dataBackup = await getBackupList();

    return res.status(201).json(dataBackup);
  } catch (err) {
    next(err);
  }
};
