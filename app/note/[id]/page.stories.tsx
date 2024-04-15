import { Meta, StoryObj } from '@storybook/react'
import { useSearchParams } from '@storybook/nextjs/navigation.mock'
import { cookies } from '@storybook/nextjs/headers.mock'
import Page from '#app/note/[id]/page'
import { prisma } from '#lib/db'
import { createUserCookie, userCookieKey } from '#lib/session'

const meta = {
  component: Page,
  parameters: {
    mode: 'page',
    layout: 'fullscreen',
  },
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
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
  },
}

export const NotLoggedIn: Story = {}

export const WithSearchFilter: Story = {
  beforeEach() {
    useSearchParams.mockReturnValue({ get: () => 'RSC' })
  },
}

export const EmptyState: Story = {
  async beforeEach() {
    await prisma.note.deleteMany()
  },
}
