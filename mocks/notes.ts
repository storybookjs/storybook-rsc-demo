import { type Note } from '@prisma/client'

export const createNotes: () => Note[] = () => [
  {
    id: '1',
    title: 'Module mocking in Storybook?',
    body: "Yup, that's a thing now! 🎉",
    createdBy: 'storybookjs',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Hello World',
    body: 'RSC is pretty cool, even cooler that Storybook supports it!',
    createdBy: 'storybookjs',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
