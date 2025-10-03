import preview from '#.storybook/preview'
import { expect } from 'storybook/test'
import { cookies } from 'next/headers'
import Page from './page'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { expectToHaveBeenNavigatedTo } from '#lib/test-utils'
import EditSkeleton from '#app/note/edit/loading'
import { PageDecorator } from '#.storybook/decorators'

const meta = preview.meta({
  component: Page,
  parameters: { layout: 'fullscreen' },
  decorators: [PageDecorator],
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

export const EditNewNote = meta.story()

EditNewNote.test('save should create new note and redirect', async ({ canvas, userEvent }) => {
  const titleInput = await canvas.findByLabelText('Enter a title for your note')
  const bodyInput = await canvas.findByLabelText('Enter the body for your note')
  await userEvent.clear(titleInput)
  await userEvent.type(titleInput, 'New Note Title', {})
  await userEvent.type(bodyInput, 'New Note Body')
  await userEvent.click(await canvas.findByRole('menuitem', { name: /done/i }))

  await expectToHaveBeenNavigatedTo({ pathname: '/note/3' })

  await expect(await db.note.findUnique({ where: { id: 3 } })).toEqual(
    expect.objectContaining({
      title: 'New Note Title',
      body: 'New Note Body',
    }),
  )
})

export const Loading = meta.story({
  render: () => <EditSkeleton />,
})
