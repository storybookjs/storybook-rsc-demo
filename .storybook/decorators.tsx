import { type Decorator } from '@storybook/react'
import { Layout } from '#app/layout'

export const PageDecorator: Decorator = (Story) => {
  return (
    <Layout>
      <Story />
    </Layout>
  )
}
