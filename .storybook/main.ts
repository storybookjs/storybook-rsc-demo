import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'
import { mergeConfig } from 'vite'
import * as path from 'path'

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/experimental-addon-test',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    return mergeConfig(config, {
      // Use a workaround for this prisma vite issue
      // https://github.com/prisma/prisma/issues/12504#issuecomment-1827097530
      resolve: {
        alias: {
          '.prisma/client/index-browser': require
            .resolve('@prisma/client/index-browser')
            .replace(`@prisma${path.sep}client`, `.prisma${path.sep}client`),
        },
      },
    })
  },
}
export default config
