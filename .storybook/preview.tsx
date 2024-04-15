import '../app/style.css'
import type { Preview } from '@storybook/react'
import { resetMockDB } from '#lib/db.mock'
import { onMockCall } from '@storybook/test'

onMockCall((spy, args) => {
  console.log(spy.name, args)
})
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: { appDirectory: true },
  },
  beforeEach() {
    resetMockDB()
  },
}

export default preview
