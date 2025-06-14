import express from 'express'
import cors from 'cors'
import healthRoutes from './routes/health.routes'
import authRoutes from './routes/auth.routes' 
import userRoutes from './routes/user.routes'
import appointmentRoutes from './routes/appointment.routes'

import { logger } from './utils/logger'
import { logRequests } from './middlewares/logRequests'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logRequests)

app.use('/health', healthRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/appointments', appointmentRoutes)

app.listen(3333, () => {
  logger.info('Server started on port: 3333')
})