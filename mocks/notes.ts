import { type Note } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const createNotes: () => Note[] = () => {
  // Fixed dates for consistent screenshots
  const date = new Date('2024-04-18T12:24:02Z')
  const otherDate = new Date('2024-04-19T15:22:04Z')
  return [
    {
      id: '1',
      title: 'Module mocking in Storybook?',
      body: "Yup, that's a thing now! 🎉",
      createdBy: 'storybookjs',
      createdAt: date,
      updatedAt: date,
    },
    {
      id: '2',
      title: 'Hello World',
      body: 'RSC is pretty cool, even cooler that Storybook supports it!',
      createdBy: 'storybookjs',
      createdAt: otherDate,
      updatedAt: otherDate,
    },
  ]
}
