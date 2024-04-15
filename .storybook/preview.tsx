import React from 'react'
import '../app/style.css'
import type { Preview } from '@storybook/react'
import { prisma } from '#prisma/prisma.mock'

import Layout from '#app/layout';
import { headers } from 'next/headers'

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
    const data = prisma.$getInternalState()
    for (var member in data) data[member as keyof typeof data] = []

    // Layout uses html/body which breaks Storybook. We can disable it via a header
    headers().set('use-html-tag', false)
  },
  decorators: [(Story, { parameters }) => {
    if (parameters.mode === 'page') {
      return <Layout><Story /></Layout>
    }
    return <Story />
  }],
}

export default preview
