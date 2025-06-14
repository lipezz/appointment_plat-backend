import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/auth.service'

export const register = async (req: Request, res: Response) => {
  
  try {
    const { name, email, password } = req.body
    const user = await registerUser(name, email, password)
    return res.status(201).json(user)
  
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message })
  }
}

export const login = async (req: Request, res: Response) => {
  
  try {
    const { email, password } = req.body
    const { token, user } = await loginUser(email, password)

    return res.status(200).json({ token, user })

  } catch (error) {
    return res.status(400).json({ error: (error as Error).message })
  }
}
