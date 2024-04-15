import React from 'react'
import '../app/style.css'
import type { Preview } from '@storybook/react'
import { prisma } from '#lib/db.mock'

import Layout from '#app/layout'
import { headers } from 'next/headers'
import { resetMockDB } from '#lib/db.mock'

const preview: Preview = {
  parameters: {
    mode: 'component',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  beforeEach() {
    resetMockDB()
  },
  decorators: [
    (Story, { parameters }) => {
      if (parameters.mode === 'page') {
        return (
          <Layout>
            <Story />
          </Layout>
        )
      }
      return <Story />
    },
  ],
}

export default preview
