import { Router } from 'express'
import { getMe } from '../controllers/user.controller'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.get('/me', authenticate, getMe)

export default router