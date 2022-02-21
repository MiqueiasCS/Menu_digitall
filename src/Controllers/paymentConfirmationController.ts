import { NextFunction, Request, Response } from "express";
import { createPaymentConfirmationService } from "../Services/paymentConfirmatinService";

export const CreatePaymentConfirmation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const confirm = await createPaymentConfirmationService(
      req.body.tableidentifier
    );

    return res.status(201).json(confirm);
  } catch (err) {
    next(err);
  }
};
