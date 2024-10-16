'use server'

import { db } from '#lib/db'
import { userCookieKey } from '#lib/session'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserFromSession } from '#lib/session'

export async function saveNote(noteId: number | undefined, title: string, body: string) {
  const user = await getUserFromSession()

  if (!user) {
    redirect('/')
  }
  const payload = {
    id: noteId,
    title: title.slice(0, 255),
    body: body.slice(0, 2048),
    createdBy: user,
  }

  if (!noteId) {
    const newNote = await db.note.create({ data: payload })
    redirect(`/note/${newNote.id}`)
  }
  await db.note.update({
    where: { id: noteId },
    data: payload,
  })
  redirect(`/note/${noteId}`)
}

export async function deleteNote(noteId: number) {
  await db.note.delete({
    where: {
      id: noteId,
    },
  })

  redirect('/')
}

export async function logout() {
  const cookieStore = cookies()
  cookieStore.delete(userCookieKey)

  redirect('/')
}

export async function login() {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_KEY}&allow_signup=false`,
  )
}
