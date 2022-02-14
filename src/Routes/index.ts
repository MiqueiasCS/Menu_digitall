import { Express } from 'express'
import { productRouter } from './productRoutes'

export const initializerRouter = (app: Express) => {
  app.use('/api/product', productRouter())
}
