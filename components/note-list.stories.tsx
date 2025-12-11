import { type Meta, type StoryObj } from '@storybook/nextjs-vite'
import NoteList from '#components/note-list'
import { createNotes } from '#mocks/notes'

const meta = {
  component: NoteList,
  args: {
    searchText: null,
  },
} satisfies Meta<typeof NoteList>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: { notes: [] },
}

export const Default: Story = {
  args: {
    notes: createNotes(),
  },
}
