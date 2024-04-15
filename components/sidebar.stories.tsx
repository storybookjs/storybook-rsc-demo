import { Meta, StoryObj } from '@storybook/react'
import { notes } from '#prisma/mock-data';
import Sidebar from "./sidebar";

const meta = {
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    notes: notes,
    children: null
  }
}
export const Empty: Story = {
  args: {
    notes: [],
    children: null
  }
}