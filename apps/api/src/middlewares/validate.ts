import {ParamsDictionary, Query} from 'express-serve-static-core'
import {NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status'
import {z} from 'zod'
import {ApiError} from '../utils/api-error'

export function validate(schema: z.ZodType) {
  return (
    req: Request<
      ParamsDictionary,
      unknown,
      unknown,
      Query,
      Record<string, unknown>
    >,
    _res: Response<unknown, Record<string, unknown>>,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req)

    if (!result.success) {
      return next(new ApiError(httpStatus.BAD_REQUEST, result.error.message))
    }

    Object.assign(req, result.data)
    return next()
  }
}
