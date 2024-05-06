import { Meta, StoryObj } from '@storybook/react'
import Sidebar from "./sidebar";
import { createNotes } from '#mocks/notes';

const meta = {
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    notes: createNotes(),
    children: null
  }
}
export const Empty: Story = {
  args: {
    notes: [],
    children: null
  }
}