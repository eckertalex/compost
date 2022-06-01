import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Request, Response, NextFunction, RequestHandler} from 'express'

export const catchAsync = <
  P = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Query,
  Locals extends Record<string, unknown> = Record<string, unknown>
>(
  fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> => {
  return (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }
}
