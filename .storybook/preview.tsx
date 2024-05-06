import '../app/style.css'
import { resetMockDB } from '#lib/db.mock'
import type { Preview } from '@storybook/react'
import { onMockCall } from '@storybook/test'
import MockDate from 'mockdate'

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
    MockDate.set('2024-05-04T14:00:00.000Z')
    resetMockDB()
  },
}

export default preview
