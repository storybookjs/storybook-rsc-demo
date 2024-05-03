import '../app/style.css'
import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as MockDate from 'mockdate'
import { initializeDB } from '#lib/db.mock'

initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    test: {
      // This is needed until Next will update to the React 19 beta: https://github.com/vercel/next.js/pull/65058
      // In the React 19 beta ErrorBoundary errors (such as redirect) are only logged, and not thrown.
      dangerouslyIgnoreUnhandledErrors: true,
    },
    nextjs: { appDirectory: true },
  },
  loaders: [mswLoader],
  beforeEach() {
    // Fixed dates for consistent screenshots
    MockDate.set('2024-04-18T12:24:02Z')
    // reset the database to avoid hanging state between stories
    initializeDB()
  },
}

export default preview
