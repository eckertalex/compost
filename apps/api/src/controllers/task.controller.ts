import httpStatus from 'http-status'
import {catchAsync} from '../utils/catch-async'
import {
  GetTasks,
  CreateTask,
  GetTask,
  UpdateTask,
  DeleteTask,
  GetListTasks,
} from '../validations/task.validation'
import * as taskService from '../services/task.service'

export const getTasks = catchAsync<
  unknown,
  unknown,
  unknown,
  GetTasks['query']
>(async (req, res): Promise<void> => {
  const {
    take,
    skip,
    orderBy = 'lastModifiedDateTime',
    sortOrder = 'desc',
  } = req.query

  const options = {
    orderBy: {
      [orderBy]: sortOrder,
    },
    take: take ? Number(take) : undefined,
    skip: skip ? Number(skip) : undefined,
  }

  const result = await taskService.findMany(options)

  res.json(result)
})

export const getListTasks = catchAsync<
  GetListTasks['params'],
  unknown,
  unknown,
  GetListTasks['query']
>(async (req, res): Promise<void> => {
  const {listUuid} = req.params
  const {
    take,
    skip,
    orderBy = 'lastModifiedDateTime',
    sortOrder = 'desc',
  } = req.query

  const options = {
    where: {
      listUuid,
    },
    orderBy: {
      [orderBy]: sortOrder,
    },
    take: take ? Number(take) : undefined,
    skip: skip ? Number(skip) : undefined,
  }

  const result = await taskService.findMany(options)

  res.json(result)
})

export const createTask = catchAsync<unknown, unknown, CreateTask['body']>(
  async (req, res): Promise<void> => {
    const data = req.body
    const task = await taskService.create({
      data,
    })

    res.status(httpStatus.CREATED).json(task)
  }
)

export const getTask = catchAsync<GetTask['params']>(
  async (req, res): Promise<void> => {
    const {taskUuid} = req.params

    const task = await taskService.findUnique({
      where: {
        uuid: taskUuid,
      },
    })

    res.json(task)
  }
)

export const updateTask = catchAsync<
  UpdateTask['params'],
  unknown,
  UpdateTask['body']
>(async (req, res): Promise<void> => {
  const {taskUuid} = req.params
  const data = req.body

  const task = await taskService.updateUnique({
    where: {
      uuid: taskUuid,
    },
    data,
  })

  res.json(task)
})

export const deleteTask = catchAsync<DeleteTask['params']>(
  async (req, res): Promise<void> => {
    const {taskUuid} = req.params

    await taskService.deleteByUuid({
      where: {
        uuid: taskUuid,
      },
    })

    res.status(httpStatus.NO_CONTENT).send()
  }
)
