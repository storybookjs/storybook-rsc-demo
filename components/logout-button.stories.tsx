import { Meta, StoryObj } from '@storybook/react'
import { within, userEvent, expect } from '@storybook/test'
import LogoutButton from "./logout-button";
import { getUserFromSession } from '#libs/get-user-from-session.mock';
import { logout } from '#app/actions.mock';

const meta = {
  title: 'Mocked/LogoutButton',
  component: LogoutButton,
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  }
} satisfies Meta<typeof LogoutButton>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
  beforeEach: () => {
    getUserFromSession.mockReturnValueOnce('storybookjs')
  },
  args: {
    children: "Add"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')
    await userEvent.click(button)
    await expect(logout).toHaveBeenCalledTimes(1)
  }
}