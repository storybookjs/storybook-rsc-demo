import path from 'node:path'
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-coverage',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  // @ts-expect-error Nextjs doesn't have viteFinal in its types
  viteFinal: async (config) => {
    const vitePluginNext = (await import('vite-plugin-storybook-nextjs'))
      .default
    config.plugins.push(vitePluginNext({ dir: path.join(__dirname, '..') }))
    return config
  },
}
export default config
