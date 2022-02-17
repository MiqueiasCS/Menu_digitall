import { Router } from 'express'
import { createProduct, getAllProducts, getProductById, updateProductStatus } from '../Controllers/productController'
import { authentication } from '../Middlewares/authentication'
import { validateDataSchema } from '../Middlewares/validateDataSchema'
import { productSchema } from '../Schemas/productSchema'

const router = Router()

export const productRouter = () => {
  router.post('', authentication, validateDataSchema(productSchema), createProduct)
  router.get('/:id', getProductById)
  router.get('', getAllProducts)
  router.patch('/:id', authentication, updateProductStatus)
  
  return router
}
