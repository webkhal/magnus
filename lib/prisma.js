import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis // No type assertion in JS

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // You can remove this in production
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma