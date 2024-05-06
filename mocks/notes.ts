import { type Note } from '@prisma/client'

export const createNotes: () => Note[] = () => {
  const mockedDate = new Date('2024-05-04T14:00:00.000Z')
  return [
    {
      id: '1',
      title: 'Module mocking in Storybook?',
      body: "Yup, that's a thing now! 🎉",
      createdBy: 'storybookjs',
      createdAt: mockedDate,
      updatedAt: mockedDate,
    },
    {
      id: '2',
      title: 'Hello World',
      body: 'RSC is pretty cool, even cooler that Storybook supports it!',
      createdBy: 'storybookjs',
      createdAt: mockedDate,
      updatedAt: mockedDate,
    },
  ]
}
