import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/experimental-nextjs-vite'
import * as projectAnnotations from './preview'
import './a11y.vitest.setup'

const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations])

beforeAll(annotations.beforeAll)
