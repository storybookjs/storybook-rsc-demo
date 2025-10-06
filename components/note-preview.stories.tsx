import preview from '#.storybook/preview'
import NotePreview from './note-preview'

const meta = preview.meta({
  component: NotePreview,
})

export const Default = meta.story({
  args: {
    children: '<h3>Some heading</h3>\n<i>italian text</i>',
  },
})
