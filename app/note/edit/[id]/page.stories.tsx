import { expect } from '@storybook/test'
import { type Meta, type StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import Page from './page'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'
import { expectRedirect } from '#lib/test-utils'

const meta = {
  component: Page,
  decorators: [PageDecorator],
  parameters: { layout: 'fullscreen' },
  args: { params: { id: '2' } },
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

export const EditNote: Story = {}

export const UnknownId: Story = {
  args: { params: { id: '999' } },
}

export const SavingExistingNoteShouldUpdateDBAndRedirect: Story = {
  play: async ({ userEvent, canvas }) => {
    const titleInput = await canvas.findByLabelText('Enter a title for your note')
    const bodyInput = await canvas.findByLabelText('Enter the body for your note')

    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Edited Title')
    await userEvent.clear(bodyInput)
    await userEvent.type(bodyInput, 'Edited Body')
    await userEvent.click(await canvas.findByRole('menuitem', { name: /done/i }))

    await expectRedirect('/note/2')

    await expect(await db.note.findUnique({ where: { id: 2 } })).toEqual(
      expect.objectContaining({
        title: 'Edited Title',
        body: 'Edited Body',
      }),
    )
  },
}

export const DeleteNoteRemovesFromDBAndSidebar: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(
      await db.note.findMany({ where: { id: 2 } }),
      'Note with id 2 does exist',
    ).toHaveLength(1)

    await userEvent.click(await canvas.findByRole('menuitem', { name: /delete/i }))

    await expectRedirect('/')

    await expect(
      await db.note.findMany({ where: { id: 2 } }),
      'Note with id 2 does not exist anymore',
    ).toHaveLength(0)
  },
}
