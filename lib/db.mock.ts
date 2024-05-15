import { Prisma, type PrismaClient } from '@prisma/client'
import { fn, isMockFunction } from '@storybook/test'
import createPrismaMock from 'prisma-mock'
import json from '#prisma/dmmf.json'

// @ts-expect-error Specify jest.fn as it is used by prisma-mock
globalThis.jest = { fn }

const createPrismaClientMock = (
  data: Parameters<typeof createPrismaMock<PrismaClient>>[0] = {},
) => {
  const db = createPrismaMock<PrismaClient>(
    data,
    json.datamodel as Prisma.DMMF.Datamodel,
  )
  // Give some more useful spy names
  for (const [tableName, table] of Object.entries(db)) {
    for (const [methodName, method] of Object.entries(table)) {
      if (isMockFunction(method)) {
        method.mockName(`db.${tableName}.${methodName}`)
      }
    }
  }
  return db
}

export let db = createPrismaClientMock()

export function initializeDB(
  data: Parameters<typeof createPrismaMock<PrismaClient>>[0] = {},
) {
  db = createPrismaClientMock(data)

  // @ts-ignore This Error class is not loaded properly in the browser, mocking it for now like a regular Error
  Prisma.PrismaClientKnownRequestError = class PrismaClientKnownRequestError extends (
    Error
  ) {}
}
