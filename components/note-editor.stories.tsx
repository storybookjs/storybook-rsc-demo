import preview from '#.storybook/preview'
import NoteEditor from './note-editor'

const meta = preview.meta({
  component: NoteEditor,
  args: {
    initialTitle: 'This is a title',
    initialBody: 'This is a body',
    noteId: 1,
  },
})

export const Default = meta.story()
export const Draft = meta.story({
  args: {
    noteId: undefined,
  },
})
