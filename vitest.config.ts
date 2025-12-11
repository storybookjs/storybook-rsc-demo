import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [storybookTest()],
  publicDir: './public',
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{
        browser: 'chromium',
        headless: true,
        screenshotFailures: false
      }]
    },
    setupFiles: ['./.storybook/vitest.setup.ts'],
    coverage: {
      include: ['{app,lib,components}/**/*'],
      exclude: [...coverageConfigDefaults.exclude, '**/*.{stories,mock}.*'],
      provider: 'istanbul',
    },
  },
})
