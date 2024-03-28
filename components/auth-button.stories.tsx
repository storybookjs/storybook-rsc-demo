import { Meta, StoryObj } from '@storybook/react'
import AuthButton from "./auth-button";
import { getUserFromSession } from '#libs/get-user-from-session.mock';

const meta = {
  title: 'Mocked/AuthButton',
  component: AuthButton,
  args: {
    noteId: null
  }
} satisfies Meta<typeof AuthButton>

export default meta;

type Story = StoryObj<typeof meta>

export const LoggedIn: Story = {
  loaders: () => {
    getUserFromSession.mockReturnValueOnce('storybookjs')
  },
  args: {
    children: "Add"
  }
}

export const LoggedOut: Story = {
  loaders: () => {
    getUserFromSession.mockReturnValueOnce(null)
  },
}