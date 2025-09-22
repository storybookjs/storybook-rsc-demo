import preview from '#.storybook/preview'
import AuthButton from './auth-button'
import { getUserFromSession } from '#lib/session'
import { mocked } from 'storybook/test'

const meta = preview.meta({
  component: AuthButton,
  args: {
    noteId: null,
  },
  parameters: { react: { rsc: true } },
})

export const LoggedIn = meta.story({
  beforeEach: () => {
    mocked(getUserFromSession).mockResolvedValue('storybookjs')
  },
  args: { children: 'Add' },
})

export const LoggedOut = meta.story()
