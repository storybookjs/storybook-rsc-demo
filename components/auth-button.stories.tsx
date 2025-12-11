import { type Meta, type StoryObj } from '@storybook/nextjs-vite'
import AuthButton from './auth-button'
import { getUserFromSession } from '#lib/session'
import { mocked } from 'storybook/test';

const meta = {
  component: AuthButton,
  args: {
    noteId: null,
  },
  parameters: { react: { rsc: true } },
} satisfies Meta<typeof AuthButton>

export default meta

type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  beforeEach: () => {
    mocked(getUserFromSession).mockResolvedValue('storybookjs')
  },
  args: { children: 'Add' },
}

export const LoggedOut: Story = {}
