import {PrismaClient} from '@prisma/client'
import {mockDeep, mockReset, DeepMockProxy} from 'jest-mock-extended'
import {prisma} from '../../src/utils/prisma'

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

jest.mock('../../src/utils/prisma', () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})
