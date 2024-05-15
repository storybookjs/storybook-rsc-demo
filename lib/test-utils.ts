import { expect, waitFor } from '@storybook/test'
import { getRouter } from '@storybook/nextjs/navigation.mock'

export const expectRedirect = () =>
  waitFor(() => expect(getRouter().push).toHaveBeenCalled())
