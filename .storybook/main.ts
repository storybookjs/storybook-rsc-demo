import { defineMain } from '@storybook/nextjs-vite-rsc/node'
import { mergeConfig } from 'vite'
import * as path from 'path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export default defineMain({
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/nextjs-vite-rsc',
    options: {},
  },
  features: {
    experimentalRSC: true,
    experimentalTestSyntax: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    return mergeConfig(config, {
      // Use a workaround for this prisma vite issue
      // https://github.com/prisma/prisma/issues/12504#issuecomment-1827097530
      environments: {
        react_client: {
          optimizeDeps: {
            include: [
              'cheerio',
              'cookie-signature-edge',
              'date-fns',
              'marked',
              'ms',
              '@prisma/client',
              'next/image',
              'next/dist/client/image-component',
              'next/dist/shared/lib/image-config-context.shared-runtime',
              'next/dist/shared/lib/image-config'
            ],
          },
        },
      },
      resolve: {
        alias: {
          'next/dist/shared/lib/image-loader': path.resolve('./.storybook/loader.js'),
          'next/image': path.resolve('./.storybook/image.js'),
          '.prisma/client/index-browser': require
            .resolve('@prisma/client/index-browser')
            .replace(`@prisma${path.sep}client`, `.prisma${path.sep}client`),
        },
      },
    })
  },
})
