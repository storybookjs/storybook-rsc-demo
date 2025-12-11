import type { StorybookConfig } from '@storybook/nextjs-vite'
import { mergeConfig } from 'vite'
import * as path from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/nextjs-vite',
  features: {
    experimentalRSC: true,
  },
  core: {
    disableTelemetry: true,
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
