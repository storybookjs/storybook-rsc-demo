import { Meta, StoryObj } from '@storybook/react'
import { cookies } from 'next/headers'
import Page from './page'
import { db } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'

const meta = {
  component: Page,
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
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/note/edit/[id]',
        query: { id: '2' },
      },
    },
  },
  args: { params: { id: '2' } },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
