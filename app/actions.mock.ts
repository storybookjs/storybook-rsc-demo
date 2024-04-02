import { fn } from '@storybook/test'
import { action } from '@storybook/addon-actions'

// TODO Make all fn log to the action panel in storybook itself
export const saveNote = fn(action('saveNote'))
export const deleteNote = fn(action('deleteNote'))
export const logout = fn(action('logout'))
