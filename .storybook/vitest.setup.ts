import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/experimental-nextjs-vite'
import * as projectAnnotations from './preview'
import './a11y.vitest.setup'

const annotations = setProjectAnnotations(projectAnnotations)

beforeAll(annotations.beforeAll)
