import preview from '#.storybook/preview'
import LogoutButton from './logout-button'
import { getUserFromSession } from '#lib/session'
import { mocked } from 'storybook/test'

const meta = preview.meta({
  component: LogoutButton,
  parameters: { react: { rsc: true } },
  globals: {
    // 👇 Set background value for all component stories
    backgrounds: { value: 'dark' },
  },
  async beforeEach() {
    mocked(getUserFromSession).mockResolvedValue('storybookjs')
  },
})

export const Default = meta.story()
