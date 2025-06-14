import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    })

    if (!user) 
      return res.status(404).json({ error: 'Usuário não encontrado' })

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email
    })

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
}