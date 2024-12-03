import NotePreview from '#components/note-preview'
import NoteEditor from '#components/note-editor'
import AuthButton from '#components/auth-button'
import Image from 'next/image'
import { format } from 'date-fns'
import { getUserFromSession } from '#lib/session'
import { type Note } from '@prisma/client'

type Props =
  | {
      note: Partial<Note>
      isEditing: true
    }
  | {
      note: Note
      isEditing: false
    }

export default async function NoteUI({ note, isEditing }: Props) {
  const user = await getUserFromSession()

  if (isEditing) {
    return (
      <NoteEditor noteId={note.id} initialTitle={note.title ?? ''} initialBody={note.body ?? ''} />
    )
  }

  const { id, title, body, updatedAt, createdBy } = note

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        {createdBy ? (
          <div
            style={{
              flex: '1 0 100%',
              order: '-1',
              marginTop: 10,
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
            <a href={`https://github.com/${createdBy}`} target="_blank" rel="noopener noreferrer">
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
