import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AppError } from "../Errors";

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new AppError('Missing authorization', 401))
  }

  let token = req.headers.authorization.split(' ')[1]
  
  jwt.verify(token, 'secret', (err, decoded: any) => {
    if (err) {
      return next(new AppError('Invalid token', 401))
    } else {
      req.auth = decoded.user.adm
      req.id = decoded.user.id
      return next()
    }
  })
}
