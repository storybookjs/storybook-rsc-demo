import { expect, fireEvent, userEvent, within } from '@storybook/test'
import { type Meta, type StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import { saveNote, deleteNote } from '#app/actions.mock'
import NoteUI from '#components/note-ui'
import { createNotes } from '#mocks/notes'
import { createUserCookie, userCookieKey } from '#lib/session'

const meta = {
  component: NoteUI,
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
    saveNote.mockImplementation(async () => {})
    deleteNote.mockImplementation(async () => {})
  },
} satisfies Meta<typeof NoteUI>

export default meta

type Story = StoryObj<typeof meta>

const notes = createNotes()

export const Default: Story = {
  args: { isEditing: false, note: notes[0]! },
}

export const EditMode: Story = {
  args: { isEditing: true, note: notes[0]! },
}

export const EditModeFlow: Story = {
  name: 'Edit Mode Flow ▶',
  args: {
    isEditing: true,
    note: notes[0]!,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const titleInput = await canvas.findByLabelText(
      'Enter a title for your note',
    )
    const bodyInput = await canvas.findByLabelText(
      'Enter the body for your note',
    )
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Edited Title')
    await userEvent.clear(bodyInput)
    await userEvent.type(bodyInput, 'Edited Body')

    await step('Save flow', async () => {
      const saveButton = await canvas.findByRole('menuitem', { name: /done/i })
      await userEvent.click(saveButton)
      await expect(saveNote).toHaveBeenCalledOnce()
      await expect(saveNote).toHaveBeenCalledWith(
        1,
        'Edited Title',
        'Edited Body',
      )
    })

    await step('Delete flow', async () => {
      const deleteButton = await canvas.findByRole('menuitem', {
        name: /delete/i,
      })
      await userEvent.click(deleteButton)
      await expect(deleteNote).toHaveBeenCalledOnce()
      await expect(deleteNote).toHaveBeenCalledWith(1)
    })
  },
}
