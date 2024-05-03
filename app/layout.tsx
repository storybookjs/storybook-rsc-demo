import './style.css'

import React from 'react'
import Sidebar from '#components/sidebar'
import AuthButton from '#components/auth-button'
import { db } from '#lib/db'
import LogoutButton from '#components/logout-button'
import { type Note } from '@prisma/client'

export const metadata = {
  title: 'Next.js App Router + React Server Components Demo',
  description: 'Demo of React Server Components in Next.js.',
  openGraph: {
    title: 'Next.js App Router + React Server Components Demo',
    description: 'Demo of React Server Components in Next.js.',
    images: ['https://next-rsc-notes.vercel.app/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}

export async function Layout({ children }: { children: React.ReactNode }) {
  const notes = await db.note.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  let notesArray = notes
    ? (Object.values(notes) as Note[]).sort(
        (a, b) => Number(a.id) - Number(b.id),
      )
    : []

  return (
    <div className="container">
      <div className="banner">
        <a
          href="https://nextjs.org/docs/app/building-your-application/rendering/server-components"
          target="_blank"
        >
          Learn more →
        </a>
      </div>
      <div className="logout-section">
        <LogoutButton />
      </div>
      <div className="main">
        <Sidebar notes={notesArray}>
          <AuthButton noteId={null}>Add</AuthButton>
        </Sidebar>
        <section className="col note-viewer">{children}</section>
      </div>
    </div>
  )
}
