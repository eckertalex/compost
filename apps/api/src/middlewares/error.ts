import {ErrorRequestHandler, NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status'
import {config} from '../config/config'
import {logger} from '../config/logger'
import {ApiError} from '../utils/api-error'

export const errorConverter: ErrorRequestHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

export const errorHandler: ErrorRequestHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  // The error handler will not work properly if this unused arg is removed
  // Accepting only 3 args express will not send the error but req,res,next instead
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let {statusCode, message} = err
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
    message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR])
  }

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && {stack: err.stack}),
  }

  if (config.env === 'development') {
    logger.error(err)
  }

  res.status(statusCode).send(response)
}
