import '../app/style.css'
import { initialize, mswLoader } from 'msw-storybook-addon'
import * as MockDate from 'mockdate'
import addonVitest from '@storybook/addon-vitest'
import addonA11y from '@storybook/addon-a11y'
// import addonDocs from '@storybook/addon-docs'
import { initializeDB } from '#lib/__mocks__/db'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'
import { ImageDecorator } from '#.storybook/image-decorator'
import { sb, userEvent } from 'storybook/test'

initialize({ onUnhandledRequest: 'bypass', quiet: true })

sb.mock('../app/actions.ts', { spy: true })
// sb.mock('../lib/db.ts', { spy: true })
sb.mock('../lib/session.ts', { spy: true })
sb.mock('../lib/sanitize-html.ts', { spy: true })

// Somehow the use client transform does not work with a normal import here
const { definePreview } = (await import(
  '../node_modules/' + '@storybook/nextjs-vite-rsc'
)) as typeof import('@storybook/nextjs-vite-rsc')

export default definePreview({
  addons: [addonVitest(), addonA11y()],
  parameters: {
    // TODO can be removed when this is in: https://github.com/storybookjs/storybook/pull/28943
    viewport: {
      options: MINIMAL_VIEWPORTS,
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
  decorators: [
    (Story, context) => (
      <ImageDecorator>
        <Story />
      </ImageDecorator>
    ),
  ],
  loaders: [mswLoader],
  async beforeEach({ context, parameters }) {
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
})
