import { getRouter } from '@storybook/nextjs/navigation.mock'
import { type Meta, type StoryObj } from '@storybook/react'
import Search from './search'
import { expect, fireEvent } from '@storybook/test'

const meta = {
  component: Search,
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const WithInput = {
  name: 'With input ▶️',
  play: async ({ canvas, step }) => {
    const input = canvas.getByRole('textbox')

    await step('Search', async () => {
      await fireEvent.change(input, { target: { value: 'Some search query' } })
      expect(getRouter().replace).toHaveBeenCalledWith(
        expect.stringContaining('q=Some+search+query'),
      )
    })
  },
} satisfies Story

export const InputCleared: Story = {
  name: 'Input cleared ▶️',
  play: async ({ context, canvas, step }) => {
    // eslint-disable-next-line storybook/context-in-play-function
    await WithInput.play(context)
    const input = canvas.getByRole('textbox')

    getRouter().replace.mockClear()

    await step('Clear', async () => {
      await fireEvent.change(input, { target: { value: '' } })
      expect(getRouter().replace).toHaveBeenCalledWith(
        expect.not.stringContaining('q='),
      )
    })
  },
}
