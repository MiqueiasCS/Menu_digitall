import { NextFunction, Request, Response } from 'express'
import { createUserService, getDailyBalanceService, loginService } from '../Services/userService'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUserService(req.body)
  
    return res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdm: user.isAdm
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await loginService(req.body)
    
    return res.json({ access_token: token })
  } catch (err) {
    next(err)
  }
}

export const getDailyBalance = async (req: Request, res: Response, next: NextFunction) => {
  let date = req.query.date as string

  try {
    const managmentData = await getDailyBalanceService(date)
    
    return res.json(managmentData)
  } catch (err) {
    next(err)
  }
}


