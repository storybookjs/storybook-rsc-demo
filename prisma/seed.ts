import { PrismaClient } from '@prisma/client'
import { createNotes, seed } from '../mocks/notes'
const db = new PrismaClient()

async function main() {
  await seed(db)
  console.log('The database is seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
