import NotePreview from '#components/note-preview'
import NoteEditor from '#components/note-editor'
import AuthButton from '#components/auth-button'
import { Note } from '#types/index'
import { getUser, userCookieKey } from '#libs/session'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { format } from 'date-fns'

export default function NoteUI({ note, isEditing }: { note: Note; isEditing: boolean }) {
  const cookieStore = cookies()
  const userCookie = cookieStore.get(userCookieKey)
  const user = getUser(userCookie?.value)
  const { id, title, body, updated_at, created_by: createdBy } = note
  const updatedAt = updated_at || new Date()

  if (isEditing) {
    return <NoteEditor noteId={id} initialTitle={title} initialBody={body} />
  }

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        {createdBy ? (
          <div
            style={{
              flex: '1 0 100%',
              order: '-1',
              marginTop: 10
            }}
          >
            By{' '}
            <Image
              src={`https://avatars.githubusercontent.com/${createdBy}?s=40`}
              alt="User Avatar"
              title={createdBy}
              className="avatar"
              width={40}
              height={40}
            />
            &nbsp;
            <a
              href={`https://github.com/${createdBy}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {createdBy}
            </a>
          </div>
        ) : null}
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
          </small>
          {user === createdBy ? (
            <AuthButton noteId={id}>Edit</AuthButton>
          ) : (
            <div style={{ height: 30 }} />
          )}
        </div>
      </div>
      <NotePreview>{body}</NotePreview>
    </div>
  )
}
