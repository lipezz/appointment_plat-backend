import { z } from 'zod'

export const createAppointmentSchema = z.object({
  date: z.string().datetime({ message: 'Invalid date. Use an ISO valid format.' }),
  note: z.string().optional()
})

export const updateAppointmentSchema = z.object({
  date: z.string().datetime({ message: 'Invalid date. Use an ISO valid format.' }).optional(),
  note: z.string().optional()
})