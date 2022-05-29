import Joi from 'joi'
import httpStatus from 'http-status'
import {NextFunction, Request, RequestHandler, Response} from 'express'
import {pick} from '../utils/pick'
import {ApiError} from '../utils/api-error'

export type ValidateSchema = {
  body?: boolean | Joi.ObjectSchema
  params?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
}

export const validate = (schema: ValidateSchema): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(['body', 'params', 'query'], schema)
    const validSchemaKeys = Object.keys(validSchema)
    const reqKeys: Extract<keyof typeof req, string>[] = Object.keys(
      req
    ) as Extract<keyof typeof req, string>[]
    const object = pick(
      reqKeys.filter((value: string) => validSchemaKeys.includes(value)),
      req
    )
    const {value, error} = Joi.compile(validSchema)
      .prefs({errors: {label: 'key'}, abortEarly: false})
      .validate(object)

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ')
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
    }
    Object.assign(req, value)
    return next()
  }
}
