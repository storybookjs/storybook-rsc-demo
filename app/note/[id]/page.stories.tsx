import preview from '#.storybook/preview'
import { cookies } from '@storybook/nextjs/headers.mock'
import { http } from 'msw'
import { expect, mocked } from 'storybook/test'
import Page from './page'
import { db, initializeDB } from '#lib/__mocks__/db'
import { createUserCookie, userCookieKey } from '#lib/session'
import { PageDecorator } from '#.storybook/decorators'
import { login } from '#app/actions'
import * as auth from '#app/auth/route'
import { expectRedirect } from '#lib/test-utils'
import NoteSkeleton from '#app/note/[id]/loading'

const meta = preview.meta({
  component: Page,
  decorators: [PageDecorator],
  parameters: { layout: 'fullscreen' },
  args: { params: { id: '1' } },
  async beforeEach() {
    await db.note.create({
      data: {
        title: 'Module mocking in Storybook?',
        body: "Yup, that's a thing now! 🎉",
        createdBy: 'storybookjs',
      },
    })
    await db.note.create({
      data: {
        title: 'RSC support as well??',
        body: 'RSC is pretty cool, even cooler that Storybook supports it!',
        createdBy: 'storybookjs',
      },
    })
  },
})

export const LoggedIn = meta.story({
  async beforeEach() {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
  },
})

export const NotLoggedIn = meta.story()

export const LoginShouldGetOAuthTokenAndSetCookie = meta.story({
  parameters: {
    msw: {
      // Mock out OAUTH
      handlers: [
        http.post('https://github.com/login/oauth/access_token', async ({ request }) => {
          let json = (await request.json()) as any
          return Response.json({ access_token: json.code })
        }),
        http.get('https://api.github.com/user', async ({ request }) =>
          Response.json({
            login: request.headers.get('Authorization')?.replace('token ', ''),
          }),
        ),
      ],
    },
  },
  play: async ({ mount, userEvent }) => {
    // Point the login implementation to the endpoint github would have redirected too.
    mocked(login).mockImplementation(async () => {
      return await auth.GET(new Request('/auth?code=storybookjs'))
    })
    const canvas = await mount()
    await expect(cookies().get(userCookieKey)?.value).toBeUndefined()
    await userEvent.click(await canvas.findByRole('menuitem', { name: /login to add/i }))
    await expectRedirect('/')
    await expect(cookies().get(userCookieKey)?.value).toContain('storybookjs')
  },
})

export const LogoutShouldDeleteCookie = meta.story({
  play: async ({ mount, userEvent }) => {
    cookies().set(userCookieKey, await createUserCookie('storybookjs'))
    const canvas = await mount()
    await expect(cookies().get(userCookieKey)?.value).toContain('storybookjs')
    await userEvent.click(await canvas.findByRole('button', { name: 'logout' }))
    await expectRedirect('/')
    await expect(cookies().get(userCookieKey)).toBeUndefined()
  },
})

export const SearchInputShouldFilterNotes = meta.story({
  parameters: {
    nextjs: { navigation: { query: { q: 'RSC' } } },
  },
})

export const EmptyState = meta.story({
  async beforeEach() {
    initializeDB({}) // init an empty DB
  },
})

export const Loading = meta.story({
  render: () => <NoteSkeleton />,
})
