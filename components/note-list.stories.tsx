import { Meta, StoryObj } from '@storybook/react'
import { notes } from '#prisma/mock-data'
import NoteList from "./note-list";

const meta = {
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