import { NextFunction, Request, Response } from "express";
import { AnyObjectSchema } from "yup";
import { AppError } from "../Errors";

export const validateDataSchema = (schema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    await schema.validate(data, { abortEarly: false, stripUnknown: true })
    return next()
  } catch (e) {
    return next(new AppError({ [(e as any).name]: (e as any).errors }, 400))
  }
}
