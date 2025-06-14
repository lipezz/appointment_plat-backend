import {
  createAppointment,
  getAppointmentsByUser,
  getUpcomingAppointments,
  updateAppointment,
  deleteAppointment,
} from '../services/appointment.service'

import { prisma } from '../lib/prisma'

// Mocking Prisma directly
jest.mock('../lib/prisma', () => ({
  prisma: {
    appointment: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

const userId = 'user-1'
const appointmentId = 'appt-1'
const date = new Date('2025-07-01T10:00:00Z')
const note = 'Test appointment'

const fakeAppointment = { 
  id: appointmentId, 
  userId: userId, 
  date: date, 
  note: note 
}

describe('Appointment Service', () => {  

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create an appointment', async () => {
    
    (prisma.appointment.create as jest.Mock).mockResolvedValue(fakeAppointment)

    const result = await createAppointment(userId, date, 'Test appointment')

    expect(result).toEqual(fakeAppointment)
    expect(prisma.appointment.create).toHaveBeenCalledWith({
      data: {
        date,
        note: 'Test appointment',
        user: {
          connect: { id: userId },
        },
      },
    })
  })

  it('should get appointments by user', async () => {

    const appointments = [{ id: appointmentId, userId, date }]
    
    ;(prisma.appointment.findMany as jest.Mock).mockResolvedValue(appointments)

    const result = await getAppointmentsByUser(userId)

    expect(result).toEqual(appointments)
    expect(prisma.appointment.findMany).toHaveBeenCalledWith({
      where: { userId },
      orderBy: { date: 'asc' },
    })
  })

  it('should get upcoming appointments', async () => {

    const appointments = [{ id: appointmentId, userId, date }]
    
    ;(prisma.appointment.findMany as jest.Mock).mockResolvedValue(appointments)

    const result = await getUpcomingAppointments(userId)

    expect(result).toEqual(appointments)
    expect(prisma.appointment.findMany).toHaveBeenCalledWith({
      where: {
        userId,
        date: { gte: expect.any(Date) },
      },
      orderBy: { date: 'asc' },
    })
  })

  it('should update an appointment', async () => {

    const updatedDate = new Date('2025-08-01T15:00:00Z')
    const updatedNote = 'Nova nota'
    const appointment = { id: appointmentId, userId, date }

    ;(prisma.appointment.findUnique as jest.Mock).mockResolvedValue(appointment)
    ;(prisma.appointment.update as jest.Mock).mockResolvedValue({ ...appointment, date: updatedDate, note: updatedNote })

    const result = await updateAppointment(userId, appointmentId, updatedDate, updatedNote)

    expect(result).toEqual({ ...appointment, date: updatedDate, note: updatedNote })

    expect(prisma.appointment.update).toHaveBeenCalledWith({
      where: { id: appointmentId },
      data: {
        date: updatedDate,
        note: updatedNote,
      },
    })
  })

  it('should throw error when updating non-existent appointment', async () => {

    ;(prisma.appointment.findUnique as jest.Mock).mockResolvedValue(null)

    await expect(updateAppointment(userId, appointmentId, date, 'x')).rejects.toThrow('Appointment not found.')
  })

  it('should delete an appointment', async () => {

    const appointment = { id: appointmentId, userId, date }

    ;(prisma.appointment.findUnique as jest.Mock).mockResolvedValue(appointment)
    ;(prisma.appointment.delete as jest.Mock).mockResolvedValue(undefined)

    await deleteAppointment(userId, appointmentId)

    expect(prisma.appointment.delete).toHaveBeenCalledWith({
      where: { id: appointmentId },
    })
  })

  it('should throw error when deleting non-existent appointment', async () => {
    
    ;(prisma.appointment.findUnique as jest.Mock).mockResolvedValue(null)

    await expect(deleteAppointment(userId, appointmentId)).rejects.toThrow('Appointment not found.')
  })
})