import { expect, fireEvent, userEvent, within } from '@storybook/test'
import { Meta, StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import { saveNote, deleteNote } from '#app/actions.mock'
import NoteUI from '#components/note-ui'
import { createNotes } from '#mocks/notes'
import { createUserCookie, userCookieKey } from '#lib/session'

const meta = {
  component: NoteUI,
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
  }
} satisfies Meta<typeof NoteUI>

export default meta

type Story = StoryObj<typeof meta>

const notes = createNotes()

export const Default: Story = {
  args: { isEditing: false, note: notes[0] },
}

export const EditMode: Story = {
  args: { isEditing: true, note: notes[0] },
}

export const EditModeFlow: Story = {
  name: 'Edit Mode Flow ▶',
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
  },
}
