import {Prisma} from '@prisma/client'
import httpStatus from 'http-status'
import {ApiError} from '../utils/api-error'
import {catchAsync} from '../utils/catch-async'
import {db} from '../utils/db'

type GetTasksQuery = {
  skip: string
  take: string
}

export const getTasks = catchAsync<unknown, unknown, unknown, GetTasksQuery>(
  async (req, res): Promise<void> => {
    const {skip, take} = req.query

    const options = {
      take: take ? parseInt(take) : undefined,
      skip: skip ? parseInt(skip) : undefined,
    }

    const tasks = await db.task.findMany({...options})

    res.json({result: tasks, ...options})
  }
)

export const getTask = catchAsync<Prisma.TaskWhereUniqueInput>(
  async (req, res, next): Promise<void> => {
    const {uuid} = req.params

    try {
      const task = await db.task.findUnique({
        where: {uuid},
      })

      res.json(task)
    } catch (err) {
      let error = err
      if (error instanceof Error && error.name === 'NotFoundError') {
        error = new ApiError(
          httpStatus.NOT_FOUND,
          'No task found',
          true,
          error.stack
        )
      }

      next(error)
    }
  }
)
