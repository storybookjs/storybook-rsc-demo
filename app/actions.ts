'use server'

import { prisma } from '#lib/db'
import { userCookieKey } from '#lib/session'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserFromSession } from '#lib/session'

export async function saveNote(
  noteId: string | undefined,
  title: string,
  body: string,
) {
  const user = getUserFromSession()

  if (!user) {
    redirect('/')
  }

  if (!noteId) {
    noteId = Date.now().toString()
  }

  const payload = {
    id: noteId,
    title: title.slice(0, 255),
    body: body.slice(0, 2048),
    createdBy: user,
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
  const cookieStore = cookies()
  cookieStore.delete(userCookieKey)

  redirect('/')
}
