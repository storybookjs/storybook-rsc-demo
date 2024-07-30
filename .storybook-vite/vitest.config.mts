import path from 'node:path'
import { storybookTest } from '@storybook/experimental-vitest-plugin'
import vitePluginNext from 'vite-plugin-storybook-nextjs'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vitePluginNext({ dir: path.join(__dirname, '..') }),
    storybookTest({
      renderer: 'react',
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
    setupFiles: ['./.storybook-vite/storybook.setup.ts'],
    environment: 'happy-dom',
  },
})
