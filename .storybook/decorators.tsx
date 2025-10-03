import { Layout } from '#app/layout'
import { type ReactNode, Suspense } from 'react'

export const PageDecorator = (Story: () => ReactNode) => {
  return (
    <Suspense>
      <Layout>
        <Story />
      </Layout>
    </Suspense>
  )
}
