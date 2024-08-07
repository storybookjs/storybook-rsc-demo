import path from 'node:path'
import { storybookTest } from '@storybook/experimental-addon-vitest/plugin'
import vitePluginNext from 'vite-plugin-storybook-nextjs'
import { defineConfig } from 'vitest/config'

const __dirname = import.meta.dirname

export default defineConfig({
  plugins: [
    vitePluginNext({ dir: path.join(__dirname, '..') }),
    storybookTest({
      storybookScript: 'pnpm run storybook --ci',
    }),
    {
      name: 'crypto-polyfill',
      config(config) {
        if (!config.test?.browser?.enabled) {
          return {
            test: {
              setupFiles: ['./.storybook-vite/vitest.setup.crypto.ts'],
            },
          }
        }
      },
    },
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
    setupFiles: ['./.storybook-vite/storybook.setup.ts'],
    environment: 'happy-dom',
  },
})
