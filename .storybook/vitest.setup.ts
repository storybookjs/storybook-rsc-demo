import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as projectAnnotations from './preview'

const annotations = setProjectAnnotations(projectAnnotations)

beforeAll(annotations.beforeAll!)
