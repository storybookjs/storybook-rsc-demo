import { expect, fireEvent, userEvent, within } from '@storybook/test'
import { Meta, StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import Page from './page'
import { saveNote, deleteNote } from '#app/actions.mock'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'
import { db } from '#lib/db.mock'

const meta = {
  component: Page,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/note/edit',
      },
    },
  },
  decorators: [PageDecorator],
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
    await db.note.create({
      data: {
        title: 'Module mocking in Storybook?',
        body: "Yup, that's a thing now! 🎉",
        createdBy: 'storybookjs',
      },
    })
    await db.note.create({
      data: {
        title: 'RSC support as well??',
        body: 'RSC is pretty cool, even cooler that Storybook supports it!',
        createdBy: 'storybookjs',
      },
    })
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const EditNewNote: Story = {}

export const Save: Story = {
  name: 'Save New Flow ▶',
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
      await fireEvent.change(titleInput, { target: { value: 'New Note Title' } })
      await fireEvent.change(bodyInput, { target: { value: 'New Note Body' } })
    })

    await step('Save', async () => {
      const saveButton = canvas.getByRole('menuitem', { name: /done/i })
      await userEvent.click(saveButton)
      await expect(saveNote).toHaveBeenCalledOnce()
      await expect(saveNote).toHaveBeenCalledWith(
        undefined,
        'New Note Title',
        'New Note Body',
      )
    })
  },
}
