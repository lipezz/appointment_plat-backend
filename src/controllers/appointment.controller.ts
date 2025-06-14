import { Request, Response } from 'express'
import { createAppointmentSchema, updateAppointmentSchema } from '../schemas/appointment.schema'
import {
  createAppointment,
  getAppointmentsByUser,
  getUpcomingAppointments,
  updateAppointment,
  deleteAppointment
} from '../services/appointment.service'

import { logger } from '../utils/logger'

export const create = async (req: Request, res: Response) => {
  
  logger.info('AppointmentController.create')

  try {

    const userId = req.user as string
    const validatedData = createAppointmentSchema.parse(req.body)
    const appointment = await createAppointment(userId, new Date(validatedData.date), validatedData.note)

    logger.info('AppointmentService.createAppointment: ' + JSON.stringify(appointment))

    return res.status(201).json(appointment)

  } catch (error) {

    if (error instanceof Error) 
      logger.error(`Erro: ${error.message} - Stack: ${error.stack}`)
    else 
      logger.error(`Erro desconhecido: ${JSON.stringify(error)}`)

    if (error instanceof Error && 'issues' in error) 
      return res.status(400).json({ error: (error as any).issues?.[0]?.message || 'Validation error.' })

    return res.status(500).json({ error: 'Error creating appointment.' })
  }
}

export const list = async (req: Request, res: Response) => {
   
   logger.info('AppointmentController.list')
  
   try {

    const userId = req.user as string
    const appointments = await getAppointmentsByUser(userId)

    logger.info('AppointmentService.getAppointmentsByUser: ' + JSON.stringify(appointments))

    return res.status(200).json(appointments)
  
   } catch (error) {

    if (error instanceof Error) 
      logger.error(`Erro: ${error.message} - Stack: ${error.stack}`)
    else 
      logger.error(`Erro desconhecido: ${JSON.stringify(error)}`)

    return res.status(500).json({ error: 'Error listing appointments.' })
  }
}


export const upcoming = async (req: Request, res: Response) => {

  logger.info('AppointmentController.upcoming')
  
  try {
    const userId = req.user as string
    const appointments = await getUpcomingAppointments(userId)

    logger.info('AppointmentService.upcoming: ' + JSON.stringify(appointments))

    return res.status(200).json(appointments)

  } catch (error) {

    if (error instanceof Error) 
      logger.error(`Erro: ${error.message} - Stack: ${error.stack}`)
    else 
      logger.error(`Erro desconhecido: ${JSON.stringify(error)}`)

    return res.status(500).json({ error: 'Error listing upcoming appointments.' })
  }
}

export const update = async (req: Request, res: Response) => {

  logger.info('AppointmentController.update')
 
  try {

    const userId = req.user as string
    const appointmentId = req.params.id
    const validatedData = updateAppointmentSchema.parse(req.body)

    const { date, note } = validatedData

    //console.log('appointmentId: '+appointmentId)

    const updated = await updateAppointment(userId, appointmentId, date ? new Date(date) : undefined, note)

    logger.info('AppointmentService.updateAppointment: ' + JSON.stringify(updated))

    return res.status(200).json(updated)

  } catch (error) {

    if (error instanceof Error) 
      logger.error(`Erro: ${error.message} - Stack: ${error.stack}`)
    else 
      logger.error(`Erro desconhecido: ${JSON.stringify(error)}`)

    if (error instanceof Error && 'issues' in error) 
      return res.status(400).json({ error: (error as any).issues?.[0]?.message || 'Validation error.' })

    return res.status(500).json({ error: 'Error updating appointment.'})
  }
}

export const remove = async (req: Request, res: Response) => {

  logger.info('AppointmentController.remove')
  
  try {
    const userId = req.user as string
    const { id } = req.params

    const deletedAppointment = await deleteAppointment(userId, id)

    logger.info('AppointmentService.deleteAppointment: ' + JSON.stringify(deletedAppointment))

    return res.status(204).send()

  } catch (error) {

    if (error instanceof Error) 
      logger.error(`Erro: ${error.message} - Stack: ${error.stack}`)
    else 
      logger.error(`Erro desconhecido: ${JSON.stringify(error)}`)

    return res.status(500).json({ error: 'Error removing appointment.' })
  }
}