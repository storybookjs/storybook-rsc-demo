import '../app/style.css'
import type { Preview } from '@storybook/react'
import { resetMockDB } from '#lib/db.mock'
import { redirect, RedirectType } from '@storybook/nextjs/navigation.mock'
import { RedirectBoundary } from 'next/dist/client/components/redirect-boundary'
import { getRedirectError } from 'next/dist/client/components/redirect'
import { RedirectStatusCode } from 'next/dist/client/components/redirect-status-code'
import { isNextRouterError } from 'next/dist/client/components/is-next-router-error'

import { initialize, mswLoader } from 'msw-storybook-addon'
import { http } from 'msw'

// Initialize MSW
initialize({ onUnhandledRequest: 'bypass' })

// Move to next addon
const origConsoleError = window.console.error
window.console.error = (...args: unknown[]) => {
  const error = args[0]
  if (
    isNextRouterError(error) ||
    (typeof error === 'string' &&
      (error.includes('A component was suspended by an uncached promise.') ||
        error.includes(
          'async/await is not yet supported in Client Components',
        )))
  ) {
    return
  }
  origConsoleError.apply(window.console, args)
}

window.addEventListener('error', (ev: WindowEventMap['error']): void => {
  if (isNextRouterError(ev.error)) {
    ev.preventDefault()
    return
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: { appDirectory: true },
    msw: {
      handlers: [
        http.post(
          'https://github.com/login/oauth/access_token',
          async ({ request }) => {
            let json = (await request.json()) as any
            return Response.json({ access_token: json.code })
          },
        ),
        http.get('https://api.github.com/user', async ({ request }) =>
          Response.json({
            login: request.headers.get('Authorization')?.replace('token ', ''),
          }),
        ),
      ],
    },
  },
  // TODO move to next addon
  decorators: [
    (Story) => (
      <RedirectBoundary>
        <Story />
      </RedirectBoundary>
    ),
  ],
  loaders: [mswLoader],
  beforeEach() {
    // TODO move to next addon
    redirect.mockImplementation(
      (url: string, type: RedirectType = RedirectType.replace): never => {
        throw getRedirectError(url, type, RedirectStatusCode.SeeOther)
      },
    )
    resetMockDB()
  },
}

export default preview
