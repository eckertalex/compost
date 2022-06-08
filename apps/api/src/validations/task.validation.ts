import {z} from 'zod'

export const getTasks = z.object({
  query: z.object({
    orderBy: z
      .enum(['displayName', 'createdDateTime', 'lastModifiedDateTime'])
      .optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    take: z.string().optional(),
    skip: z.string().optional(),
  }),
})
export type GetTasks = z.infer<typeof getTasks>

export const getListTasks = z.object({
  params: z.object({
    listUuid: z.string(),
  }),
  query: z.object({
    orderBy: z
      .enum(['displayName', 'createdDateTime', 'lastModifiedDateTime'])
      .optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    take: z.string().optional(),
    skip: z.string().optional(),
  }),
})
export type GetListTasks = z.infer<typeof getListTasks>

export const createTask = z.object({
  body: z.object({
    title: z.string(),
    status: z
      .enum([
        'NOT_STARTED',
        'IN_PROGRESS',
        'COMPLETED',
        'WAITING_ON_OTHERS',
        'DEFERRED',
      ])
      .optional(),
    completedDateTime: z.union([z.date(), z.string()]).optional(),
    importance: z.enum(['LOW', 'NORMAL', 'HIGH']).optional(),
    dueDateTime: z.union([z.date(), z.string()]).optional(),
    content: z.string().optional(),
    listUuid: z.string().optional(),
  }),
})
export type CreateTask = z.infer<typeof createTask>

export const getTask = z.object({
  params: z.object({
    taskUuid: z.string(),
  }),
})
export type GetTask = z.infer<typeof getTask>

export const updateTask = z.object({
  params: z.object({
    taskUuid: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    status: z
      .enum([
        'NOT_STARTED',
        'IN_PROGRESS',
        'COMPLETED',
        'WAITING_ON_OTHERS',
        'DEFERRED',
      ])
      .optional(),
    completedDateTime: z.union([z.date(), z.string()]).optional(),
    importance: z.enum(['LOW', 'NORMAL', 'HIGH']).optional(),
    dueDateTime: z.union([z.date(), z.string()]).optional(),
    content: z.string().optional(),
    listUuid: z.string().optional(),
  }),
})
export type UpdateTask = z.infer<typeof updateTask>

export const deleteTask = z.object({
  params: z.object({
    taskUuid: z.string(),
  }),
})
export type DeleteTask = z.infer<typeof deleteTask>
