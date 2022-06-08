import {Prisma, PrismaClient} from '@prisma/client'

export let prisma: PrismaClient

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

const prismaOptions: Prisma.PrismaClientOptions = {
  rejectOnNotFound: true,
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions)
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient(prismaOptions)
  }
  prisma = global.__prisma
}
