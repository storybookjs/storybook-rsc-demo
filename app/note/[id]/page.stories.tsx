import { Meta, StoryObj } from '@storybook/react'
import { useSearchParams } from '@storybook/nextjs/navigation.mock'
import Page from '#app/note/[id]/page'
import { prisma } from '#lib/db'
import { cookies } from '@storybook/nextjs/headers.mock'
import { createUserCookie, userCookieKey } from '#lib/session'

const meta = {
  component: Page,
  parameters: {
    mode: 'page',
    layout: 'fullscreen',
    // docs: {
    //   story: {
    //     inline: false,
    //     height: 800,
    //   }
    // }
  },
  // TODO: fix autodocs by having docs stories run sequentially
  // tags: ['autodocs'],
  async beforeEach() {
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
  async beforeEach() {
    const cookiesMock = cookies()
    cookiesMock.set(userCookieKey, await createUserCookie('storybookjs'));
  }
}

export const NotLoggedIn: Story = {}

export const WithSearchFilter: Story = {
  async beforeEach() {
    useSearchParams.mockReturnValue({ get: () => 'RSC' })
  }
}

export const EmptyState: Story = {
  async beforeEach() {
    await prisma.note.deleteMany()
  }
}

