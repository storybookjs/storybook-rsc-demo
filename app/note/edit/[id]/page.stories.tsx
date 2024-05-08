import { expect, fireEvent, userEvent, within } from '@storybook/test'
import { Meta, StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import Page from '#app/note/edit/[id]/page'
import { saveNote, deleteNote } from '#app/actions.mock'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'

const meta = {
  component: Page,
  parameters: { layout: 'fullscreen' },
  decorators: [PageDecorator],
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
    await db.note.create({
      data: {
        id: '1',
        title: 'Module mocking in Storybook?',
        body: "Yup, that's a thing now! 🎉",
        createdBy: 'storybookjs',
      },
    })
    await db.note.create({
      data: {
        id: '2',
        title: 'RSC support as well??',
        body: 'RSC is pretty cool, even cooler that Storybook supports it!',
        createdBy: 'storybookjs',
      },
    })
  },
  args: { params: { id: '2' } },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const EditNote: Story = {}

export const UnknownId: Story = {
  args: { params: { id: '999' } },
}

export const Save: Story = {
  name: 'Save and Delete Flow ▶',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const titleInput = await canvas.findByRole('textbox', {
      name: /Enter a title for your note/i,
    })
    const bodyInput = canvas.getByRole('textbox', { name: /body/i })

    await step('Clear inputs', async () => {
      await userEvent.clear(titleInput)
      await userEvent.clear(bodyInput)
    })

    await step('Edit inputs', async () => {
      await fireEvent.change(titleInput, { target: { value: 'Edited Title' } })
      await fireEvent.change(bodyInput, { target: { value: 'Edited Body' } })
    })

    await step('Save', async () => {
      const saveButton = canvas.getByRole('menuitem', { name: /done/i })
      await userEvent.click(saveButton)
      await expect(saveNote).toHaveBeenCalledOnce()
      await expect(saveNote).toHaveBeenCalledWith(
        '2',
        'Edited Title',
        'Edited Body',
      )
    })

    await step('Delete', async () => {
      const deleteButton = canvas.getByRole('menuitem', { name: /delete/i })
      await userEvent.click(deleteButton)
      await expect(deleteNote).toHaveBeenCalledOnce()
      await expect(deleteNote).toHaveBeenCalledWith('2')
    })
  },
}
