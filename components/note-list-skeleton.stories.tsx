import { type Meta, type StoryObj } from '@storybook/react'
import NoteListSkeleton from "./note-list-skeleton";

const meta = {
  component: NoteListSkeleton,
} satisfies Meta<typeof NoteListSkeleton>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {}