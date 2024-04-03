import { fn } from '@storybook/test'
import type * as original from './get-user-from-session'

export const getUserFromSession = fn<
  [],
  string | null
>() satisfies typeof original.getUserFromSession
