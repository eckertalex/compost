import httpStatus from 'http-status'
import httpMocks from 'node-mocks-http'
import winston from 'winston'
import {logger} from '../../config/logger'
import {ApiError} from '../../utils/api-error'
import {errorHandler} from '../error'

jest.mock('../../config/config', () => ({
  config: {
    env: 'production',
  },
}))

describe('Error middlewares (production)', () => {
  describe('Error handler (production)', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation((): winston.Logger => {
        return winston.createLogger({
          transports: [new winston.transports.Console()],
        })
      })
    })

    test('should send internal server error status and message if in production mode and error is not operational', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error', false)
      const res = httpMocks.createResponse()
      const next = jest.fn()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, next)

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: httpStatus.INTERNAL_SERVER_ERROR,
          message: httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
        })
      )
      expect(res.locals.errorMessage).toBe(error.message)
    })

    test('should preserve original error status and message if in production mode and error is operational', () => {
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
    })
  })
})
