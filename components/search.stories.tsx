import preview from '#.storybook/preview'
import Search from './search'

const meta = preview.meta({
  component: Search,
})

export const Default = meta.story()

// export const WithInput = meta.story({
//   name: 'With input ▶️',
//   play: async ({ canvas, step }) => {
//     const input = canvas.getByRole('textbox')
//
//     await step('Search', async () => {
//       await fireEvent.change(input, { target: { value: 'Some search query' } })
//       await expectToHaveBeenNavigatedTo({
//         search: 'q=Some search query'
//       })
//     })
//   },
// })
//
// export const InputCleared = meta.story({
//   name: 'Input cleared ▶️',
//   play: async ({ context, canvas, step }) => {
//     // eslint-disable-next-line storybook/context-in-play-function
//     await WithInput.play(context)
//     const input = canvas.getByRole('textbox')
//
//     // getRouter().replace.mockClear()
//
//     await step('Clear', async () => {
//       await fireEvent.change(input, { target: { value: '' } })
//       // expect(getRouter().replace).toHaveBeenCalledWith(expect.not.stringContaining('q='))
//     })
//   },
// })
