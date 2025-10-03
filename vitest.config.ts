import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [storybookTest()],
  publicDir: './public',
  test: {
    exclude: ['**/node_modules/**'],
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
      headless: true,
      screenshotFailures: false,
    },
    isolate: false,
    coverage: {
      all: true,
      include: ['{app,lib,components}/**/*'],
      exclude: [...coverageConfigDefaults.exclude, '**/*.{stories,mock}.*'],
      provider: 'istanbul',
    },
  },
})
