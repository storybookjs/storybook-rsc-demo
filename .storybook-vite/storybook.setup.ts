import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as rscAnnotations from '@storybook/react/dist/entry-preview-rsc.mjs'
import * as projectAnnotations from './preview'
// promise with resolveres polyfill
import '@ungap/with-resolvers'

const annotations = setProjectAnnotations([projectAnnotations, rscAnnotations])

beforeAll(annotations.beforeAll!)
