import { type Prisma, type PrismaClient } from '@prisma/client'
import { fn, isMockFunction } from '@storybook/test'
import createPrismaMock from 'prisma-mock'
import json from '#prisma/dmmf.json'

// @ts-expect-error Specify jest.fn as it used by prisma-mock
globalThis.jest = { fn }

const createPrismaClientMock = () =>
  createPrismaMock<PrismaClient>({}, json.datamodel as Prisma.DMMF.Datamodel)

export let db = createPrismaClientMock()

export function resetMockDB() {
  db = createPrismaClientMock()

  // Give some more useful spy names
  for (const [tableName, table] of Object.entries(db)) {
    for (const [methodName, method] of Object.entries(table)) {
      if (isMockFunction(method)) {
        method.mockName(`db.${tableName}.${methodName}`)
      }
    }
  }
}
