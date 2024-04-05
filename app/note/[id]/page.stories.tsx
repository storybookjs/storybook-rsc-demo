import { Meta, StoryObj } from '@storybook/react'
import Page from '#app/note/[id]/page'
import { prisma } from '#prisma/prisma'
import { cookies } from 'next/headers'
import { createUserCookie, userCookieKey } from '#libs/session'

const meta = {
  component: Page,
  parameters: {
    mode: 'page',
    layout: 'fullscreen'
  },
  // TODO: fix autodocs by having docs stories run sequentially
  // tags: ['autodocs'],
  async loaders() {
    await prisma.note.create({
      data: {
        id: '1',
        title: 'Module mocking in Storybook?',
        body: "Yup, that's a thing now! 🎉",
        createdBy: 'storybookjs',
      },
    })
    await prisma.note.create({
      data: {
        id: '2',
        title: 'RSC support as well??',
        body: 'RSC is pretty cool, even cooler that Storybook supports it!',
        createdBy: 'storybookjs',
      },
    })
  },
  args: {
    params: { id: '2' },
  },
} satisfies Meta<typeof Page>

export default meta

type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  async loaders() {
    console.log("LOADER FROM LOGGED IN")
    const cookieStore = cookies()
    cookieStore.set(userCookieKey, await createUserCookie('storybookjs'));
  }
}

export const NotLoggedIn: Story = {}

