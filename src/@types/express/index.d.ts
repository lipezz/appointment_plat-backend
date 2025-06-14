import { Request } from 'express'

import 'express-serve-static-core'

declare module 'express-serve-static-core' {
  interface Request {
    user?: string
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: string
    }
  }
}