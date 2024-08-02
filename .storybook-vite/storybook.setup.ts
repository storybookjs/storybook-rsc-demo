import { beforeAll, beforeEach } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as rendererDocsAnnotations from '@storybook/react/dist/entry-preview-docs.mjs'
import * as rscAnnotations from '@storybook/react/dist/entry-preview-rsc.mjs'
import * as addonActionsAnnotations from '@storybook/addon-actions/preview'
import * as addonInteractionsAnnotations from '@storybook/addon-interactions/preview'
import * as projectAnnotations from './preview'
import "./polyfills/promise-with-resolvers";


const { cleanup, render: testingLibraryRender } = await import(
  '@testing-library/react/pure'
)

beforeEach(cleanup)

const annotations = setProjectAnnotations([
  rscAnnotations,
  rendererDocsAnnotations,
  addonActionsAnnotations,
  addonInteractionsAnnotations,
  projectAnnotations,
  { testingLibraryRender },
])

beforeAll(annotations.beforeAll!)
