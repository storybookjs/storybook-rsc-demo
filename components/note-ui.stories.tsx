import { expect, sb } from 'storybook/test'
import { type Meta, type StoryObj } from '@storybook/nextjs-vite'
import NoteUI from '#components/note-ui'
import { createNotes } from '#mocks/notes'

// Import the actual modules that will be mocked by sb.mock
import * as actions from '#app/actions'
import * as session from '#lib/session'

const meta = {
  component: NoteUI,
  parameters: { react: { rsc: true } },
  async beforeEach() {
    sb.mocked(session.getUserFromSession).mockResolvedValue('storybookjs')
    sb.mocked(actions.saveNote).mockImplementation(async () => {})
    sb.mocked(actions.deleteNote).mockImplementation(async () => {})
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

export const SaveAndDeleteShouldTriggerActions: Story = {
  args: {
    isEditing: true,
    note: notes[0]!,
  },
  play: async ({ canvas, step, userEvent }) => {
    const titleInput = await canvas.findByLabelText('Enter a title for your note')
    const bodyInput = await canvas.findByLabelText('Enter the body for your note')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Edited Title')
    await userEvent.clear(bodyInput)
    await userEvent.type(bodyInput, 'Edited Body')

    await step('Save flow', async () => {
      const saveButton = await canvas.findByRole('menuitem', { name: /done/i })
      await userEvent.click(saveButton)
      await expect(sb.mocked(actions.saveNote)).toHaveBeenCalledOnce()
      await expect(sb.mocked(actions.saveNote)).toHaveBeenCalledWith(1, 'Edited Title', 'Edited Body')
    })

    await step('Delete flow', async () => {
      const deleteButton = await canvas.findByRole('menuitem', {
        name: /delete/i,
      })
      await userEvent.click(deleteButton)
      await expect(sb.mocked(actions.deleteNote)).toHaveBeenCalledOnce()
      await expect(sb.mocked(actions.deleteNote)).toHaveBeenCalledWith(1)
    })
  },
}
