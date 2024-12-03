import { afterEach, expect } from 'vitest'
import * as axe from 'axe-core'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

afterEach(async () => {
  const results = await axe.run(document.body.querySelector('div')!)
  // TODO fix the a11y failures
  // expect(results).toHaveNoViolations()
})

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
