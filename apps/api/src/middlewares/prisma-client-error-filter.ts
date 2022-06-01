import {Prisma} from '@prisma/client'
import {ErrorRequestHandler, NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status'
import {ApiError} from '../utils/api-error'

function cleanUpError(error: Prisma.PrismaClientKnownRequestError): string {
  return error.message.replace(/\n/g, '')
}

export const prismaClientErrorFilter: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  let error = err
  // https://www.prisma.io/docs/reference/api-reference/error-reference
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2000') {
      // catch value too long
      error = new ApiError(
        httpStatus.BAD_REQUEST,
        cleanUpError(error),
        true,
        error.stack
      )
    } else if (error.code === 'P2002') {
      // catch unique constraint
      error = new ApiError(
        httpStatus.CONFLICT,
        cleanUpError(error),
        true,
        error.stack
      )
    } else if (error.code === 'P2025') {
      // catch not found
      error = new ApiError(
        httpStatus.NOT_FOUND,
        cleanUpError(error),
        true,
        error.stack
      )
    }
  }

  next(error)
}
