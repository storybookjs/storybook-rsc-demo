import NoteUI from '#components/note-ui'
import prisma from '#prisma/prisma'

export const metadata = {
  robots: {
    index: false
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const note = await prisma.note.findUnique({
    where: {
      id: params.id,
    },
  });

  if (note === null) {
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
