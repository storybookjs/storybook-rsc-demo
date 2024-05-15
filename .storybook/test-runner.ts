import { type TestRunnerConfig, getStoryContext } from '@storybook/test-runner'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 }

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    const context = await getStoryContext(page, story)
    const viewportName = context.parameters?.viewport?.defaultViewport
    const viewportParameter = MINIMAL_VIEWPORTS[viewportName]

    if (
      viewportParameter &&
      viewportParameter.styles &&
      typeof viewportParameter.styles === 'object'
    ) {
      const viewportSize = Object.entries(viewportParameter.styles).reduce(
        (acc, [screen, size]) => ({
          ...acc,
          // make sure your viewport config in Storybook only uses numbers, not percentages
          [screen]: parseInt(size),
        }),
        {} as { width: number; height: number },
      )

      page.setViewportSize(viewportSize)
    } else {
      page.setViewportSize(DEFAULT_VIEWPORT_SIZE)
    }
  },
}
export default config
