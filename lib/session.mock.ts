import { fn } from 'storybook/test'
import * as actual from './session'

export * from './session'
export const getUserFromSession = fn(actual.getUserFromSession).mockName('getUserFromSession')
