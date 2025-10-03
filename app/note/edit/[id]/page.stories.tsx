import preview from '#.storybook/preview'
import { expect, waitFor } from 'storybook/test'
import { cookies } from 'next/headers'
import Page from './page'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { expectToHaveBeenNavigatedTo } from '#lib/test-utils'
import { PageDecorator } from '#.storybook/decorators'

const meta = preview.meta({
  component: Page,
  decorators: [PageDecorator],
  parameters: { layout: 'fullscreen' },
  args: { params: { id: '2' } },
  async beforeEach() {
    ;(await cookies()).set(userCookieKey, await createUserCookie('storybookjs'))
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
})

export const EditNote = meta.story()

EditNote.test(
  'saving existing note should update db and redirect',
  async ({ canvas, userEvent }) => {
    const titleInput = await canvas.findByLabelText('Enter a title for your note')
    const bodyInput = await canvas.findByLabelText('Enter the body for your note')

    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Edited Title')
    await userEvent.clear(bodyInput)
    await userEvent.type(bodyInput, 'Edited Body')
    await userEvent.click(await canvas.findByRole('menuitem', { name: /done/i }))

    await expectToHaveBeenNavigatedTo({ pathname: '/note/2' })
    await expect(await db.note.findUnique({ where: { id: 2 } })).toEqual(
      expect.objectContaining({
        title: 'Edited Title',
        body: 'Edited Body',
      }),
    )
  },
)

EditNote.test('delete note removes from db and sidebar', async ({ canvas, userEvent }) => {
  await expect(
    await db.note.findMany({ where: { id: 2 } }),
    'Note with id 2 does exist',
  ).toHaveLength(1)

  await userEvent.click(await canvas.findByRole('menuitem', { name: /delete/i }))
  await expectToHaveBeenNavigatedTo({ pathname: '/' })
  await expect(
    await db.note.findMany({ where: { id: 2 } }),
    'Note with id 2 does not exist anymore',
  ).toHaveLength(0)
})

export const UnknownId = meta.story({
  args: { params: { id: '999' } },
})
