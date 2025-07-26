import { type Meta, type StoryObj } from '@storybook/react';
import NoteEditor from "./note-editor";

const meta = {
  component: NoteEditor,
  args: {
    initialTitle: 'This title has changed and PR is closed',
    initialBody: 'This is a body',
    noteId: 1,
  }
} satisfies Meta<typeof NoteEditor>

export default meta;

type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Draft: Story = {
  args: {
    noteId: undefined,
  }
}