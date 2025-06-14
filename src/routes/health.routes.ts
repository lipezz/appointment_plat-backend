import { Router, Request, Response } from 'express'
import os from 'os'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const host = os.hostname()
  res.status(200).send(`App plat-agendamento started on ${host}`)
})

export default router