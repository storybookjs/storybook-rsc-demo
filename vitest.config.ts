import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookNextJsPlugin } from '@storybook/experimental-nextjs-vite/vite-plugin'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [storybookNextJsPlugin(), storybookTest()],
  publicDir: './public',
  test: {
    include: ['./**/*.{story,stories}.?(c|m)[jt]s?(x)'],
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
      screenshotFailures: false,
    },
    isolate: false,
    setupFiles: ['./.storybook/vitest.setup.ts'],
    coverage: {
      all: true,
      include: ['{app,lib,components}/**/*'],
      exclude: [...coverageConfigDefaults.exclude, '**/*.{stories,mock}.*'],
      provider: 'istanbul',
    },
  },
})
