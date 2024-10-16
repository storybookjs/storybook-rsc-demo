import React from 'react'
// @ts-expect-error add types/upgrade dep
import marked from 'marked'
import { sanitizeHtml } from '#lib/sanitize-html'

export default function NotePreview({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(marked(children || '')),
        }}
      />
    </div>
  )
}
