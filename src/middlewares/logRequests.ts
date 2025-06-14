import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  
  const { method, url, headers, body, params, query } = req

  logger.info({
    message: 'Incoming request',
    method,
    url,
    headers,      
    params,
    query,
    body
  })

  next()

}