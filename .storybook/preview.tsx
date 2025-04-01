import '../app/style.css'
import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as MockDate from 'mockdate'
import { initializeDB } from '#lib/db.mock'
import { userEvent } from '@storybook/test'
initialize({ onUnhandledRequest: 'bypass', quiet: true })

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

const preview: Preview = {
  parameters: {
    // TODO can be removed when this is in: https://github.com/storybookjs/storybook/pull/28943
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
    },

    // We can disable this, as we set Suspense in the PageDecorator.
    react: { rsc: false },

    test: {
      // This is not needed anymore when upgrading to Next 15.
      // In Next 15 ErrorBoundary errors (such as redirect) are only logged, and not thrown.
      dangerouslyIgnoreUnhandledErrors: true,
    },

    nextjs: { appDirectory: true },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  loaders: [mswLoader],
  beforeEach({ context, parameters }) {
    context.userEvent = userEvent.setup({
      // When running vitest in browser mode, the pointer events are not correctly simulated.
      // This can be related to this [known issue](https://github.com/microsoft/playwright/issues/12821).
      // The bug also appears not only in chromium, but also in webkit.
      // We use`{ pointerEventsCheck: 0 }` to disable the pointer events check.
      pointerEventsCheck: 0,
    })

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
