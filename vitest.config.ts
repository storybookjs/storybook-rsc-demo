import { storybookTest } from '@storybook/experimental-addon-vitest/plugin'
import vitePluginNext from 'vite-plugin-storybook-nextjs'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vitePluginNext(),
    storybookTest({
      storybookScript: 'pnpm run storybook --ci',
    }),
  ],
  publicDir: './public',
  test: {
    name: 'storybook',
    include: ['./**/*.{story,stories}.?(c|m)[jt]s?(x)'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
      screenshotFailures: false,
    },
    setupFiles: ['./.storybook/vitest.setup.ts'],
  },
})
