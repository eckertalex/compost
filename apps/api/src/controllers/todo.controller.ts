import {catchAsync} from '../utils/catch-async'
import {db} from '../utils/db'

export const getTodos = catchAsync(async (_req, res): Promise<void> => {
  const result = await db.todo.findMany()
  res.send(result)
})
