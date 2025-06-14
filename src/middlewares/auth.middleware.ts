//import { AuthTokenPayload } from '../types/auth' 
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  userId: string
}

export interface AuthenticatedRequest extends Request {
  userId?: string
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const token = authHeader.split(' ')[1]

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.userId = decoded.userId
    next()
  
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}