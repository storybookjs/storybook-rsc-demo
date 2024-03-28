import React from 'react';
import '../app/style.css'
import type { Preview } from '@storybook/react'
// import Layout from '#app/layout';

const preview: Preview = {
  parameters: {
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
  // TODO: bring this up once prisma mocks are set up
  // decorators: [(Story) => <Layout><Story /></Layout>],
}

export default preview
