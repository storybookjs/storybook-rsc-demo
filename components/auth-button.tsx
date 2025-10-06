import { type ReactNode } from 'react'
import Image from 'next/image'
import { getUserFromSession } from '#lib/session'
import { login } from '#app/actions'

type Props = {
  children?: ReactNode
  noteId: number | null
}

export default async function AuthButton({ children, noteId }: Props) {
  const user = await getUserFromSession()
  const isDraft = noteId == null

  if (user) {
    return (
      // Use hard link
      <a href={`/note/edit/${noteId || ''}`} className="link--unstyled">
        <button
          className={['edit-button', isDraft ? 'edit-button--solid' : 'edit-button--outline'].join(
            ' ',
          )}
          role="menuitem"
        >
          {children}
          <Image
            src={`https://avatars.githubusercontent.com/${user}?s=40`}
            alt="User Avatar"
            title={user}
            className="avatar"
            width={40}
            height={40}
          />
        </button>
      </a>
    )
  }

  return (
    <form action={login}>
      <button
        className={['edit-button', isDraft ? 'edit-button--solid' : 'edit-button--outline'].join(
          ' ',
        )}
        role="menuitem"
      >
        Login to Add
      </button>
    </form>
  )
}
