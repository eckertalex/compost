import supertest from 'supertest'
import httpStatus from 'http-status'
import {app} from '../../../app'

jest.mock('../../../config/config', () => ({
  config: {
    env: 'production',
  },
}))

describe('Docs routes', () => {
  describe('GET /v1/docs', () => {
    test('should return 404 when running in production', () => {
      return supertest(app).get('/v1/docs').send().expect(httpStatus.NOT_FOUND)
    })
  })
})
