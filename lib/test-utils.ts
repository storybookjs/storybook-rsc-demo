import { expect, waitFor } from 'storybook/test'

export async function expectToHaveBeenNavigatedTo(url: Partial<URL>) {
  await waitFor(async () =>
    expect((globalThis as any).onNavigate).toHaveBeenCalledWith(expect.objectContaining(url)),
  )
}
