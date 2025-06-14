import { prisma } from '../lib/prisma'
import { registerUser, loginUser } from '../services/auth.service'

describe('Auth Service - Integration', () => {
  const email = 'authuser@example.com'
  const password = '123456'
  const name = 'Auth User'

  afterAll(async () => {
    await prisma.user.deleteMany()
    await prisma.$disconnect()
  })

  it('should register a new user', async () => {
    const user = await registerUser(name, email, password)
    expect(user.email).toBe(email)
    expect(user.password).not.toBe(password) // must be hashed
  })

  it('should login with correct credentials', async () => {
    const result = await loginUser(email, password)
    expect(result).toHaveProperty('token')
    expect(result.user.email).toBe(email)
  })

  it('should fail login with wrong password', async () => {
    await expect(loginUser(email, 'wrongpass')).rejects.toThrow('Invalid password')
  })

  it('should fail login with wrong email', async () => {
    await expect(loginUser('wrong@example.com', password)).rejects.toThrow('User not found')
  })
})