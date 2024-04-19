import '../app/style.css'
import type { Preview } from '@storybook/react'
import { resetMockDB } from '#lib/db.mock'
import { initialize, mswLoader } from 'msw-storybook-addon'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: { appDirectory: true },
  },
  loaders: [mswLoader],
  beforeEach() {
    resetMockDB()
  },
}

export default preview
