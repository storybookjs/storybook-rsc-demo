import { type Meta, type StoryObj } from '@storybook/experimental-nextjs-vite'
import NoteListSkeleton from "./note-list-skeleton";

const meta = {
  component: NoteListSkeleton,
} satisfies Meta<typeof NoteListSkeleton>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {}