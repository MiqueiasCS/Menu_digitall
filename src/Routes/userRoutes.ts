import { Router } from 'express'
import { createUser, login } from '../Controllers/userController'
import { validateDataSchema } from '../Middlewares/validateDataSchema'
import { loginSchema } from '../Schemas/loginSchema'
import { userSchema } from '../Schemas/userSchema'

const router = Router()

export const userRouter = () => {
  router.post('', validateDataSchema(userSchema), createUser)
  router.post('/login', validateDataSchema(loginSchema), login)
  
  return router
}
