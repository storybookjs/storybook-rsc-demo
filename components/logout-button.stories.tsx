import { type Meta, type StoryObj } from '@storybook/nextjs-vite'
import LogoutButton from './logout-button'
import { getUserFromSession } from '#lib/session'
import { mocked } from 'storybook/test'

const meta = {
  component: LogoutButton,
  parameters: { react: { rsc: true } },
  globals: {
    // 👇 Set background value for all component stories
    backgrounds: { value: 'dark' },
  },
  async beforeEach() {
    mocked(getUserFromSession).mockResolvedValue('storybookjs')

  },
} satisfies Meta<typeof LogoutButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
