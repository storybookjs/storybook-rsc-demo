import { type Prisma, type PrismaClient } from '@prisma/client'
import { fn } from '@storybook/test'
import createPrismaMock, { PrismaMockData } from 'prisma-mock'
import json from '#prisma/dmmf.json'

// @ts-expect-error Maybe we should contribute to prisma-mock
// To make sure it is not tightly coupled with jest
globalThis.jest = fn

const createPrismaClientMock = () =>
  createPrismaMock<
    PrismaClient & {
      $getInternalState: () => Required<PrismaMockData<PrismaClient>>
    }
  >({}, json.datamodel as Prisma.DMMF.Datamodel)

export let prisma = createPrismaMock<
  PrismaClient & {
    $getInternalState: () => Required<PrismaMockData<PrismaClient>>
  }
>({}, json.datamodel as Prisma.DMMF.Datamodel)

export function resetMockDB() {
  prisma = createPrismaClientMock()
}
