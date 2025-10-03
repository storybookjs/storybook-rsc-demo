'use client'

import { ImageConfigContext } from 'next/dist/shared/lib/image-config-context.shared-runtime'
import nextConfig from '../next.config.mjs'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

export const ImageDecorator = ({ children }: { children: React.ReactNode }) => (
  <ImageConfigContext.Provider
    value={{
      ...imageConfigDefault,
      ...nextConfig.images,
      loader: 'custom',
      unoptimized: true,
    }}
  >
    {children}
  </ImageConfigContext.Provider>
)
