import NoteUI from '#components/note-ui'
import { db } from '#lib/db'

export const metadata = {
  robots: { index: false },
}

type Props = {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const note = await db.note.findUnique({ where: { id: Number(params.id) } })
  if (note == undefined) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteUI note={note} isEditing={false} />
}
