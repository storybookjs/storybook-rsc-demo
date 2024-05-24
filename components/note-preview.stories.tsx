import { type Meta, type StoryObj } from '@storybook/react'
import NotePreview from "./note-preview";

const meta = {
  component: NotePreview,
} satisfies Meta<typeof NotePreview>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {
  args: {
    children: "<h3>Some heading</h3>\n<i>italian text</i>"
  }
}