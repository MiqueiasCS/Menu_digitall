import { NextFunction, Request, Response } from 'express'
import { createProductService } from '../Services/productService'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdm = true // Criar um middleware de autenticação e utilizar o valor aqui
    const product = await createProductService(req.body, isAdm)

    return res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}
