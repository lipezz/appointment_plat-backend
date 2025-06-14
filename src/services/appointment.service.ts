import { prisma } from '../lib/prisma'

export const createAppointment = async (userId: string, date: Date, note?: string ) => {
  return await prisma.appointment.create({
    data: {
      date,
      note,
      user: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export const getAppointmentsByUser = async (userId: string) => {
  return await prisma.appointment.findMany({
    where: { userId },
    orderBy: { date: 'asc' }, 
  })
}

export const getUpcomingAppointments = async (userId: string) => {
  return await prisma.appointment.findMany({
    where: {
      userId,
      date: { gte: new Date() }
    },
    orderBy: { date: 'asc' }
  })
}

export const updateAppointment = async (userId: string, id: string, date?: Date, note?: string) => {

  const appointment = await prisma.appointment.findUnique({ where: { id } })

  if (!appointment || appointment.userId !== userId) 
    throw new Error('Appointment not found.')

  return await prisma.appointment.update({
    where: { id },
    data: {
      ...(date && { date: new Date(date) }),
      ...(note && { note })
    }
  })
}

export const deleteAppointment = async (userId: string, id: string) => {
  const appointment = await prisma.appointment.findUnique({ where: { id } })

  if (!appointment || appointment.userId !== userId) 
    throw new Error('Appointment not found.')

  await prisma.appointment.delete({ where: { id } })
}