'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import NoteList from '#components/note-list'
import NoteListSkeleton from '#components/note-list-skeleton'
import SearchField from '#components/search'
import Image from 'next/image'
import { type Note } from '@prisma/client'

type Props = {
  children?: React.ReactNode
  notes: Note[]
}

export default function Sidebar({ children, notes }: Props) {
  return (
    <>
      <input type="checkbox" className="sidebar-toggle" id="sidebar-toggle" />
      <section className="col sidebar">
        <Link href={'/'} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SearchField />
          {children}
        </section>
        <nav>
          <Notes notes={notes} />
        </nav>
      </section>
    </>
  )
}

function Notes({ notes }: { notes: Note[] }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  return (
    <Suspense fallback={<NoteListSkeleton />}>
      <NoteList notes={notes} searchText={search} />
    </Suspense>
  )
}
