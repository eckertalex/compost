import {Prisma} from '@prisma/client'
import httpStatus from 'http-status'
import {ApiError} from '../utils/api-error'
import {prisma} from '../utils/prisma'

export async function create(args: Prisma.ListCreateArgs) {
  return await prisma.list.create(args)
}

export async function findMany(args: Prisma.ListFindManyArgs) {
  const lists = await prisma.list.findMany(args)

  return {
    lists,
    ...args,
  }
}

export async function findUnique(args: Prisma.ListFindUniqueArgs) {
  try {
    return await prisma.list.findUnique(args)
  } catch (err) {
    let error = err

    if (error instanceof Error && error.name === 'NotFoundError') {
      error = new ApiError(httpStatus.NOT_FOUND, 'Not found', true, error.stack)
    }

    throw error
  }
}

export async function updateUnique(args: Prisma.ListUpdateArgs) {
  await findUnique({where: args.where})
  return await prisma.list.update(args)
}

export async function deleteByUuid(args: Prisma.ListDeleteArgs) {
  await findUnique(args)
  await prisma.list.delete(args)
}
