import React from 'react'
import '../app/style.css'
import type { Preview } from '@storybook/react'
import { mocked } from '@storybook/test'
import { prisma } from '#prisma/prisma.mock'

import Layout from '#app/layout';
import { cookies } from 'next/headers'

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
  loaders() {
    const data = prisma.$getInternalState()
    for (var member in data) data[member as keyof typeof data] = []
    console.log("LOADER FROM PREVIEW")
    // @ts-expect-error TODO fix this later
    mocked(cookies()).mockRestore()
  },
  decorators: [(Story, { parameters }) => {
    if (parameters.mode === 'page') {
      return <Layout><Story /></Layout>
    }
    return <Story />
  }],
}

export default preview
