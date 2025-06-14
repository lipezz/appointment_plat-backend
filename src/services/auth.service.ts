import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { prisma } from '../lib/prisma'

export const registerUser = async (name: string, email: string, password: string) => {
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  return user
}

export const loginUser = async (email: string, password: string) => {
  
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) 
    throw new Error('User not found')

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) 
    throw new Error('Invalid password')
  
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  )

  const { password: _, ...userWithoutPassword } = user // remove password

  return { token, user: userWithoutPassword }
}