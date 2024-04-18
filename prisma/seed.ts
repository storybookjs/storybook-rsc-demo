import { PrismaClient } from '@prisma/client'
import { createNotes } from '../mocks/notes'
const prisma = new PrismaClient()

async function main() {
  for (const note of createNotes()) {
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
