import '../app/style.css'
import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as MockDate from 'mockdate'
import { initializeDB } from '#lib/db.mock'
import { userEvent } from '@storybook/test'

initialize({ onUnhandledRequest: 'bypass', quiet: true })

const preview: Preview = {
  parameters: {
    react: {
      rsc: true,
    },
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
  loaders: [
    mswLoader,
    (context) => {
      context.userEvent = userEvent.setup({
        // When running vitest in browser mode, the pointer events are not correctly simulated.
        // This can be related to this [known issue](https://github.com/microsoft/playwright/issues/12821).
        // The bug also appears not only in chromium, but also in webkit.
        // We use`{ pointerEventsCheck: 0 }` to disable the pointer events check.
        pointerEventsCheck: 0,
      })
    },
  ],
  beforeEach() {
    // Fixed dates for consistent screenshots
    MockDate.set('2024-04-18T12:24:02Z')
    // reset the database to avoid hanging state between stories
    initializeDB()
  },
}

declare module '@storybook/csf' {
  interface StoryContext {
    userEvent: ReturnType<typeof userEvent.setup>
  }
}

export default preview
