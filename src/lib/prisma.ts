import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined  // Extending global scope for TypeScript
}

const prisma = globalThis.prisma ?? new PrismaClient() // Creating the instance only once in dev env

if (process.env.NODE_ENV !== 'production') 
  globalThis.prisma = prisma

export { prisma }