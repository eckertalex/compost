import {Prisma} from '@prisma/client'
import httpStatus from 'http-status'
import {ApiError} from '../utils/api-error'
import {prisma} from '../utils/prisma'

export async function create(args: Prisma.TaskCreateArgs) {
  return await prisma.task.create(args)
}

export async function findMany(args: Prisma.TaskFindManyArgs) {
  const tasks = await prisma.task.findMany(args)

  return {
    tasks,
    ...args,
  }
}

export async function findUnique(args: Prisma.TaskFindUniqueArgs) {
  try {
    return await prisma.task.findUnique(args)
  } catch (err) {
    let error = err

    if (error instanceof Error && error.name === 'NotFoundError') {
      error = new ApiError(httpStatus.NOT_FOUND, 'Not found', true, error.stack)
    }

    throw error
  }
}

export async function updateUnique(args: Prisma.TaskUpdateArgs) {
  await findUnique({where: args.where})
  return await prisma.task.update(args)
}

export async function deleteByUuid(args: Prisma.TaskDeleteArgs) {
  await findUnique(args)
  await prisma.task.delete(args)
}
