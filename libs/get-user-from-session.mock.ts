import { fn } from '@storybook/test'
import * as original from './get-user-from-session'

export const getUserFromSession = fn(original.getUserFromSession)
