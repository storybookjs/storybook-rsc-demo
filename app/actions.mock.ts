import { fn } from '@storybook/test'
import * as actions from './actions'

export const saveNote = fn(actions.saveNote).mockName('saveNote')
export const deleteNote = fn(actions.deleteNote).mockName('deleteNote')
export const logout = fn(actions.logout).mockName('logout')
export const login = fn(actions.login).mockName('login')
