import { prisma } from '../lib/prisma'
import { 
   createAppointment, 
   deleteAppointment, 
   getAppointmentsByUser, 
   getUpcomingAppointments, 
   updateAppointment 
} from '../services/appointment.service'

describe('Appointment Service - Integration', () => {
  const userId = 'test-user-id'
  let appointmentId: string

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword'
      }
    })
  })

  afterAll(async () => {
    await prisma.appointment.deleteMany()
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it('should create an appointment', async () => {
    const appointment = await createAppointment(userId, new Date('2025-07-01T10:00:00Z'), 'Check-up')
    expect(appointment).toHaveProperty('id')
    appointmentId = appointment.id
  })

  it('should get appointments by user', async () => {
    const appointments = await getAppointmentsByUser(userId)
    expect(appointments.length).toBeGreaterThan(0)
  })

  it('should get upcoming appointments', async () => {
    const appointments = await getUpcomingAppointments(userId)
    expect(appointments.length).toBeGreaterThan(0)
  })

  it('should update an appointment', async () => {
    const updated = await updateAppointment(userId, appointmentId, new Date('2025-08-01T12:00:00Z'), 'Updated note')
    expect(updated.note).toBe('Updated note')
  })

  it('should delete an appointment', async () => {
    await deleteAppointment(userId, appointmentId)
    const remaining = await getAppointmentsByUser(userId)
    expect(remaining.find(a => a.id === appointmentId)).toBeUndefined()
  })
})