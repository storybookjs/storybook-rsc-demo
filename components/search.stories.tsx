import { Meta, StoryObj } from '@storybook/react'
import Search from "./search";

const meta = {
  component: Search,
} satisfies Meta<typeof Search>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {}