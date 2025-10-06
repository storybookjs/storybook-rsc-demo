import preview from '#.storybook/preview'
import NoteList from '#components/note-list'
import { createNotes } from '#mocks/notes'

const meta = preview.meta({
  component: NoteList,
  args: {
    searchText: null,
  },
})

export const Empty = meta.story({
  args: { notes: [] },
})

export const Default = meta.story({
  args: {
    notes: createNotes(),
  },
})
