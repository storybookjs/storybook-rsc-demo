import { fn } from '@storybook/test'
import * as original from '#libs/get-user-from-session'

export const getUserFromSession = fn<
  [],
  string | null
>() satisfies typeof original.getUserFromSession
