'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function SearchField() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function search(form: FormData) {
    const params = new URLSearchParams(searchParams)
    const query = form.get('q')
    if (typeof query === 'string' && query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form action={search} className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        type="text"
        name="q"
        defaultValue={searchParams.get('q') ?? undefined}
        placeholder="Search"
        spellCheck={false}
        onChange={(e) => {
          e.currentTarget.form?.requestSubmit()
        }}
      />
      <Spinner />
    </form>
  )
}

function Spinner() {
  const { pending } = useFormStatus()
  return (
    <div
      className={['spinner', pending && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={pending ? 'true' : 'false'}
    />
  )
}
