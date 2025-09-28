import { defineMain } from '@storybook/nextjs-vite-rsc/node'
import { mergeConfig } from 'vite'
import * as path from 'path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export default defineMain({
  stories: ['../docs/**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/nextjs-vite-rsc',
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
})
