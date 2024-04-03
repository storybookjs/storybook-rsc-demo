import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: [
    '../docs/**/*.mdx',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
}
export default config
