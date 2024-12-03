import { type Meta, type StoryObj } from '@storybook/react'
import LogoutButton from './logout-button'
import { cookies } from '@storybook/nextjs/headers.mock'
import { createUserCookie, userCookieKey } from '#lib/session'

const meta = {
  component: LogoutButton,
  parameters: { backgrounds: { default: 'dark' }, react: { rsc: true } },
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
  },
} satisfies Meta<typeof LogoutButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
