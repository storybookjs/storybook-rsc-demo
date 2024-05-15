import { getRouter } from '@storybook/nextjs/navigation.mock'
import { type Meta, type StoryObj } from '@storybook/react'
import Search from './search'
import { expect, fireEvent, userEvent, within } from '@storybook/test'

const meta = {
  component: Search,
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const WithInput: Story = {
  name: 'With input ▶️',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox')

    await step('Search', async () => {
      await fireEvent.change(input, { target: { value: 'Some search query' } })
      expect(getRouter().replace).toHaveBeenCalledWith(
        expect.stringContaining('q=Some+search+query'),
      )
    })
  },
}

export const InputCleared: Story = {
  name: 'Input cleared ▶️',
  play: async (playContext) => {
    await WithInput.play!(playContext)

    const { canvasElement, step } = playContext
    const canvas = within(canvasElement)
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
