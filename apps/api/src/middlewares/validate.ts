import {NextFunction, Request, Response} from 'express'
import httpStatus from 'http-status'
import Joi from 'joi'
import {ApiError} from '../utils/api-error'
import {pick} from '../utils/pick'

export type ValidateSchema = {
  body?: boolean | Joi.ObjectSchema
  params?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
}

function filterEmpty<Obj>(object: Obj) {
  return Object.fromEntries(
    Object.entries(object).filter((obj) => obj[1].length === 0)
  )
}

// Object.entries(object).filter((obj) => obj[1].length === 0)
export function validate(schema: ValidateSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const validSchema = pick(['body', 'params', 'query'], schema)
    const validSchemaKeys = Object.keys(validSchema)

    const reqKeys = Object.keys(req) as Extract<keyof typeof req, string>[]
    const object = filterEmpty(
      pick(
        reqKeys.filter((value: string) => validSchemaKeys.includes(value)),
        req
      )
    )
    const {value, error} = Joi.compile(schema)
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
