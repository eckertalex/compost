import httpStatus from 'http-status'
import httpMocks from 'node-mocks-http'
import winston from 'winston'
import {logger} from '../../config/logger'
import {ApiError} from '../../utils/api-error'
import {errorConverter, errorHandler} from '../error'

describe('Error middlewares', () => {
  describe('Error converter', () => {
    test('should return the same ApiError object it was called with', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error')
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(error)
    })

    test('should convert an Error to ApiError and preserve its status and message', () => {
      const error: Error & Record<'statusCode', number> = Object.assign(
        new Error('Any error'),
        {
          statusCode: httpStatus.OK,
        }
      )
      error.statusCode = httpStatus.BAD_REQUEST
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(expect.any(ApiError))
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false,
        })
      )
    })

    test('should convert an Error without status to ApiError with status 500', () => {
      const error = new Error('Any error')
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(expect.any(ApiError))
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
          isOperational: false,
        })
      )
    })

    test('should convert an Error without message to ApiError with default message of that http status', () => {
      const error: Error & Record<'statusCode', number> = Object.assign(
        new Error(),
        {
          statusCode: httpStatus.OK,
        }
      )
      error.statusCode = httpStatus.BAD_REQUEST
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(expect.any(ApiError))
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: httpStatus[error.statusCode],
          isOperational: false,
        })
      )
    })

    test('should convert any other object to ApiError with status 500 and its message', () => {
      const error = {}
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(expect.any(ApiError))
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
          isOperational: false,
        })
      )
    })
  })

  describe('Error handler', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation((): winston.Logger => {
        return winston.createLogger({
          transports: [new winston.transports.Console()],
        })
      })
    })

    test('should send proper error response and put the error message in res.locals', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error')
      const res = httpMocks.createResponse()
      const next = jest.fn()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, next)

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
        })
      )
      expect(res.locals.errorMessage).toBe(error.message)
    })
  })
})
