import httpStatus from 'http-status'
import httpMocks from 'node-mocks-http'
import winston from 'winston'
import {logger} from '../../config/logger'
import {ApiError} from '../../utils/api-error'
import {errorHandler} from '../error'

jest.mock('../../config/config', () => ({
  config: {
    env: 'development',
  },
}))

describe('Error middlewares (development)', () => {
  describe('Error handler (development)', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'error').mockImplementation((): winston.Logger => {
        return winston.createLogger({
          transports: [new winston.transports.Console()],
        })
      })
    })

    test('should put the error stack in the response if in development mode', () => {
      const error = new ApiError(httpStatus.BAD_REQUEST, 'Any error')
      const res = httpMocks.createResponse()
      const next = jest.fn()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, next)

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          code: error.statusCode,
          message: error.message,
          stack: error.stack,
        })
      )
    })
  })
})
