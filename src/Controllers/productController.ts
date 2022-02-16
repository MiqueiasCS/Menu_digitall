import { NextFunction, Request, Response } from 'express'
import { createProductService, getAllProductsByOrderService, getAllProductsByPriceOrderService, getAllProductsService, getProductByIdService, updateProductStatusService } from '../Services/productService'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await createProductService(req.body, req.auth)

    return res.status(201).json(product)
  } catch (err) {
    next(err)
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const product = await getProductByIdService(id)

    return res.json(product)
  } catch (err) {
    next(err)
  }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  let orderType = req.query.order as string
  let orderPrice = req.query.price as string
  
  try {
    if (orderType) {
      orderType = orderType.toUpperCase()
      const products = await getAllProductsByOrderService(orderType)

      return res.json(products)
    } else if (orderPrice) {
      const products = await getAllProductsByPriceOrderService(parseFloat(orderPrice))
    
      return res.json(products)
    }

    const products = await getAllProductsService()

    return res.json(products)
  } catch (err) {
    next(err)
  }
}

export const updateProductStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const product = await updateProductStatusService(id, req.body.available, req.auth)

    return res.json(product)
  } catch (err) {
    next(err)
  }
}


