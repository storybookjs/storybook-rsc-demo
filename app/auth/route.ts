import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createUserCookie, userCookieKey } from '#lib/session'

const CLIENT_ID = process.env.OAUTH_CLIENT_KEY
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code')

  let token = ''
  try {
    const data = await (
      await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    ).json()

    const accessToken = data.access_token

    // Let's also fetch the user info and store it in the session.
    if (accessToken) {
      const userInfo = await (
        await fetch('https://api.github.com/user', {
          method: 'GET',
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: 'application/json',
          },
        })
      ).json()

      token = userInfo.login
    }
  } catch (err: any) {
    console.error(err)
    redirect('/')
  }

  if (!token) {
    console.error('Github authorization failed')
    redirect('/')
  }

  const cookieValue = await createUserCookie(token)
  cookies().set(userCookieKey, cookieValue, { secure: true, httpOnly: true })
  redirect('/')
}
