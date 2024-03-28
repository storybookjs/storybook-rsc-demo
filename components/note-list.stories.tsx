import { Meta, StoryObj } from '@storybook/react'
import NoteList from "./note-list";
import { notes } from '#prisma/mock-data'

const meta = {
  title: 'No Mocks/NoteList',
  component: NoteList,
  args: {
    searchText: null
  }
} satisfies Meta<typeof NoteList>

export default meta;

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    notes: [],
  }
}

export const Default: Story = {
  args: {
    notes,
  }
}