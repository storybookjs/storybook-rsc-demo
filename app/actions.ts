'use server'

import prisma from '#prisma/prisma'
import { getUser, userCookieKey } from '#libs/session'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveNote(
  noteId: string | null,
  title: string,
  body: string
) {
  const cookieStore = cookies()
  const userCookie = cookieStore.get(userCookieKey)
  const user = getUser(userCookie?.value)

  if (!noteId) {
    noteId = Date.now().toString()
  }

  const payload = {
    id: noteId,
    title: title.slice(0, 255),
    updated_at: new Date(),
    body: body.slice(0, 2048),
    created_by: user,
  }

  await prisma.note.upsert({
    where: { id: noteId },
    update: payload,
    create: payload,
  })

  revalidatePath('/')
  redirect(`/note/${noteId}`)
}

export async function deleteNote(noteId: string) {
  await prisma.note.delete({
    where: {
      id: noteId,
    },
  })

  revalidatePath('/')
  redirect('/')
}

export async function logout() {
  console.log('LOGGING OUT')
  const cookieStore = cookies()
  cookieStore.delete(userCookieKey)

  redirect('/')
}
