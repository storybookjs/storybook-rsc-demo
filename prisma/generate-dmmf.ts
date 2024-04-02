import { writeFile } from 'node:fs/promises'
import { Prisma } from '@prisma/client'

writeFile('./prisma/dmmf.json', JSON.stringify(Prisma.dmmf, null, 2))
