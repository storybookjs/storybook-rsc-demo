import { expect, userEvent } from '@storybook/test'
import { type Meta, type StoryObj } from '@storybook/react'
import { cookies } from '@storybook/nextjs/headers.mock'
import Page from './page'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'
import { expectRedirect } from '#lib/test-utils'
import EditSkeleton from '#app/note/edit/loading'

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

export const SaveNewNote: Story = {
  play: async ({ canvas }) => {
    const titleInput = await canvas.findByLabelText(
      'Enter a title for your note',
    )
    const bodyInput = await canvas.findByLabelText(
      'Enter the body for your note',
    )
    await userEvent.clear(titleInput)
    // WORKAROUND: FALSE_POSITIVE_POINTER_EVENTS
    await userEvent.type(titleInput, 'New Note Title', {
      pointerEventsCheck: 0,
    })
    // WORKAROUND: FALSE_POSITIVE_POINTER_EVENTS
    await userEvent.type(bodyInput, 'New Note Body', { pointerEventsCheck: 0 })

    await userEvent.click(
      await canvas.findByRole('menuitem', { name: /done/i }),
      // WORKAROUND: FALSE_POSITIVE_POINTER_EVENTS
      { pointerEventsCheck: 0 },
    )

    await expectRedirect('/note/3')

    await expect(await db.note.findUnique({ where: { id: 3 } })).toEqual(
      expect.objectContaining({
        title: 'New Note Title',
        body: 'New Note Body',
      }),
    )
  },
}

export const Loading: Story = {
  render: () => <EditSkeleton />,
}
