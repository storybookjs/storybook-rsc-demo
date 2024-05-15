import { type Meta, type StoryObj } from '@storybook/react'
import AuthButton from './auth-button'
import { getUserFromSession } from '#lib/session.mock'

const meta = {
  component: AuthButton,
  args: {
    noteId: null,
  },
} satisfies Meta<typeof AuthButton>

export default meta

type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  beforeEach: () => {
    getUserFromSession.mockReturnValue('storybookjs')
  },
  args: { children: 'Add' },
}

export const LoggedOut: Story = {}
