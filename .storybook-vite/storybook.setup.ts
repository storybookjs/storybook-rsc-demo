import moduleAlias from 'module-alias'

// This is only needed for Node.js environments
if (typeof process === 'object' && process.title === 'node') {
  moduleAlias.addAlias(
    'react/jsx-runtime',
    require.resolve('next/dist/compiled/react/jsx-runtime.js'),
  )
  moduleAlias.addAlias('react', require.resolve('next/dist/compiled/react'))
  moduleAlias.addAlias(
    'react-dom/test-utils',
    require.resolve(
      'next/dist/compiled/react-dom/cjs/react-dom-test-utils.production.js',
    ),
  )
  moduleAlias.addAlias(
    'react-dom/cjs/react-dom.development.js',
    require.resolve(
      'next/dist/compiled/react-dom/cjs/react-dom.development.js',
    ),
  )
  moduleAlias.addAlias(
    'react-dom/client',
    require.resolve('next/dist/compiled/react-dom/client.js'),
  )
  moduleAlias.addAlias(
    'react-dom',
    require.resolve('next/dist/compiled/react-dom'),
  )
}

import { beforeAll, beforeEach } from 'vitest'
import { setProjectAnnotations } from '@storybook/nextjs'
import * as rendererDocsAnnotations from '@storybook/react/dist/entry-preview-docs.mjs'
import * as rscAnnotations from '@storybook/react/dist/entry-preview-rsc.mjs'
import * as addonActionsAnnotations from '@storybook/addon-actions/preview'
import * as addonInteractionsAnnotations from '@storybook/addon-interactions/preview'
import * as projectAnnotations from './preview'

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
