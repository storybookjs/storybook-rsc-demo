import { fn } from '@storybook/test'

export const saveNote = fn(async () => {
  console.log('saveNote')
})
export const deleteNote = fn(async (noteId: string) => {
  console.log('deleteNote')
})
export const logout = fn(async () => {
  console.log('logout')
})
