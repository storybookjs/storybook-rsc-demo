import NoteUI from '#components/note-ui'
import { getUserFromSession } from '#lib/session'
import { db } from '#lib/db'

export const metadata = {
  robots: {
    index: false,
  },
}

type Props = {
  params: { id: string }
}

export default async function EditPage({ params }: Props) {
  const user = await getUserFromSession()

  const note = await db.note.findUnique({
    where: {
      id: Number(params.id),
    },
  })

  const isCreator = note?.createdBy === user || true

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteUI note={note} isEditing={isCreator} />
}
