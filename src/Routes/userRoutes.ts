import { Router } from 'express'
import { createUser, getDailyBalance, login } from '../Controllers/userController'
import { authentication } from '../Middlewares/authentication'
import { validateDataSchema } from '../Middlewares/validateDataSchema'
import { loginSchema } from '../Schemas/loginSchema'
import { userSchema } from '../Schemas/userSchema'

const router = Router()

export const userRouter = () => {
  router.post('', validateDataSchema(userSchema), createUser)
  router.post('/login', validateDataSchema(loginSchema), login)
  router.get('/daily_balance', authentication, getDailyBalance)
  
  return router
}
