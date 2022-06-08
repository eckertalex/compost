import httpStatus from 'http-status'
import {catchAsync} from '../utils/catch-async'
import {
  GetLists,
  CreateList,
  GetList,
  UpdateList,
  DeleteList,
} from '../validations/list.validation'
import * as listService from '../services/list.service'

export const getLists = catchAsync<
  unknown,
  unknown,
  unknown,
  GetLists['query']
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

  const result = await listService.findMany(options)

  res.json(result)
})

export const createList = catchAsync<unknown, unknown, CreateList['body']>(
  async (req, res): Promise<void> => {
    const data = req.body

    const list = await listService.create({
      data,
    })

    res.status(httpStatus.CREATED).json(list)
  }
)

export const getList = catchAsync<GetList['params']>(
  async (req, res): Promise<void> => {
    const {listUuid} = req.params

    const list = await listService.findUnique({
      where: {
        uuid: listUuid,
      },
    })

    res.json(list)
  }
)

export const updateList = catchAsync<
  UpdateList['params'],
  unknown,
  UpdateList['body']
>(async (req, res): Promise<void> => {
  const {listUuid} = req.params
  const data = req.body

  const list = await listService.updateUnique({
    where: {
      uuid: listUuid,
    },
    data,
  })

  res.json(list)
})

export const deleteList = catchAsync<DeleteList['params']>(
  async (req, res): Promise<void> => {
    const {listUuid} = req.params

    await listService.deleteByUuid({
      where: {
        uuid: listUuid,
      },
    })

    res.status(httpStatus.NO_CONTENT).send()
  }
)
