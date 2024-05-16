import { expect, waitFor } from '@storybook/test'
import { getRouter } from '@storybook/nextjs/navigation.mock'

export const expectRedirect = async (url: string) => {
  await waitFor(() =>
    expect(getRouter().push).toHaveBeenLastCalledWith(url, expect.anything()),
  )
}
