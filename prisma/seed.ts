import { Note } from '#types/index'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const notes: Note[] = [
    {
      id: '1',
      title: 'Hello World',
      body: 'RSC is pretty cool, even cooler that Storybook supports it!',
      updated_at: new Date(),
      created_by: 'storybookjs',
    },
    {
      id: '2',
      title: 'Module mocking in Storybook?',
      body: "Yup, that's a thing now! 🎉",
      updated_at: new Date(),
      created_by: 'storybookjs',
    },
  ]

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
