import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var __prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.__prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma
