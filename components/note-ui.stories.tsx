import { Meta, StoryObj } from '@storybook/react'
import NoteUI from "./note-ui";
import { notes } from '#prisma/mock-data'
import { saveNote, deleteNote } from '#app/actions.mock'
import { expect, fireEvent, userEvent, within } from '@storybook/test';

const meta = {
  title: 'Mocked/NoteUI',
  component: NoteUI,
} satisfies Meta<typeof NoteUI>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isEditing: false,
    note: notes[0],
  }
}

export const EditMode: Story = {
  args: {
    isEditing: true,
    note: notes[0],
  }
}

export const EditModeFlow: Story = {
  args: {
    isEditing: true,
    note: notes[0],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const titleInput = canvas.getByRole('textbox', { name: /title/i })
    const bodyInput = canvas.getByRole('textbox', { name: /body/i })

    await step('Clear inputs', async () => {
      await userEvent.clear(titleInput)
      await userEvent.clear(bodyInput)
    })

    await step('Edit inputs', async () => {
      await fireEvent.change(titleInput, { target: { value: 'Edited Title' } })
      await fireEvent.change(bodyInput, { target: { value: 'Edited Body' } })
    })

    await step('Save flow', async () => {
      const saveButton = canvas.getByRole('menuitem', { name: /done/i })
      await userEvent.click(saveButton)
      await expect(saveNote).toHaveBeenCalled()
    })

    await step('Delete flow', async () => {
      const deleteButton = canvas.getByRole('menuitem', { name: /delete/i })
      await userEvent.click(deleteButton)
      await expect(deleteNote).toHaveBeenCalled()
    })
  }
}
EditModeFlow.storyName = 'Edit Mode Flow ▶'