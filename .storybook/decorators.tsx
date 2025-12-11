import { type Decorator } from '@storybook/nextjs-vite'
import { Layout } from '#app/layout'
import { Suspense } from 'react'

export const PageDecorator: Decorator = (Story) => {
  return (
    <Suspense>
      <Layout>
        <Story />
      </Layout>
    </Suspense>
  )
}
