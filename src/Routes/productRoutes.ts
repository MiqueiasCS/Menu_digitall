import { Router } from 'express'
import { createProduct } from '../Controllers/productController'
import { validateDataSchema } from '../Middlewares/validateDataSchema'
import { productSchema } from '../Schemas/productSchema'

const router = Router()

export const productRouter = () => {
  router.post('', validateDataSchema(productSchema), createProduct)
  
  return router
}
