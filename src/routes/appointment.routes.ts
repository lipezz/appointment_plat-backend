import { Router } from 'express'
import { create, list } from '../controllers/appointment.controller'
import { ensureAuth } from '../middlewares/ensureAuth'
import * as AppointmentController from '../controllers/appointment.controller'

const router = Router()

router.post('/', ensureAuth, create)
router.get('/', ensureAuth, list)
router.get('/upcoming', ensureAuth, AppointmentController.upcoming)
router.put('/:id', ensureAuth, AppointmentController.update)
router.delete('/:id', ensureAuth, AppointmentController.remove)

export default router