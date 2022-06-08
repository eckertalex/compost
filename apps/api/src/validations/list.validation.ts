import {z} from 'zod'

export const getLists = z.object({
  query: z.object({
    orderBy: z
      .enum(['displayName', 'createdDateTime', 'lastModifiedDateTime'])
      .optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    take: z.string().optional(),
    skip: z.string().optional(),
  }),
})
export type GetLists = z.infer<typeof getLists>

export const createList = z.object({
  body: z.object({
    displayName: z.string(),
  }),
})
export type CreateList = z.infer<typeof createList>

export const getList = z.object({
  params: z.object({
    listUuid: z.string(),
  }),
})
export type GetList = z.infer<typeof getList>

export const updateList = z.object({
  params: z.object({
    listUuid: z.string(),
  }),
  body: z.object({
    displayName: z.string().optional(),
  }),
})
export type UpdateList = z.infer<typeof updateList>

export const deleteList = z.object({
  params: z.object({
    listUuid: z.string(),
  }),
})
export type DeleteList = z.infer<typeof deleteList>
