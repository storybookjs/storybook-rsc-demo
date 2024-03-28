import { PrismaClient } from '@prisma/client'
import { notes } from './mock-data'
const prisma = new PrismaClient()

async function main() {
  for (const note of notes) {
    await prisma.note.upsert({
      where: { id: note.id },
      update: note,
      create: note,
    })
  }

  console.log('The database is seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
