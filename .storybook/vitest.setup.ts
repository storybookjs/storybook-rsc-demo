import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview'
import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/experimental-nextjs-vite'
import * as projectAnnotations from './preview'

const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)
