import { useEffect, useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react'
import Sidebar from './sidebar'
import { createNotes } from '#mocks/notes'
import { expect, waitFor } from '@storybook/test'

const meta = {
  component: Sidebar,
  args: {
    notes: createNotes(),
    children: null,
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Empty: Story = {
  args: {
    notes: [],
  },
}

export const NotesExpanded: Story = {
  play: async ({ canvas, userEvent }) => {
    const expanders = canvas.getAllByAltText(/expand/i)

    expanders.forEach(async (expander) => {
      await userEvent.click(expander)
    })
  },
}

const changeNoteGate = Promise.withResolvers<void>()

export const NoteChangedAnimation: Story = {
  render: () => {
    const [notes, setNotes] = useState(createNotes())
    useEffect(() => {
      setTimeout(() => {
        setNotes((prevNotes) => {
          return [
            {
              ...prevNotes[0]!,
              title: 'New title',
            },
            ...prevNotes.slice(1),
          ]
        })
        changeNoteGate.resolve()
      }, 1000)
    }, [])
    return <Sidebar notes={notes} />
  },
  play: async () => {
    await changeNoteGate.promise
  },
}

export const ToggleSidebarOnMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    chromatic: { viewports: [320] },
  },
  play: async ({ canvas, step, userEvent }) => {
    const searchInput = canvas.getByRole('menubar')

    await step('Sidebar is initially visible', async () => {
      expect(searchInput).toBeVisible()
      expect(isElementInView(searchInput)).toBe(true)
    })

    await step('Select note', async () => {
      const note = canvas.getAllByRole('button', {
        name: /Open note for preview/i,
      })[0]!
      await userEvent.click(note)
    })

    await waitFor(function sidebarIsNotVisible() {
      expect(isElementInView(searchInput)).toBe(false)
    })
  },
}

/**
 * assertion to check if an element is in or out of the viewport,
 * regardless of being in the DOM or not
 */
function isElementInView(element: Element) {
  var rect = element.getBoundingClientRect()
  var html = document.documentElement

  return (
    rect.bottom >= 0 &&
    rect.top <= (window.innerHeight || html.clientHeight) &&
    rect.right >= 0 &&
    rect.left <= (window.innerWidth || html.clientWidth)
  )
}
