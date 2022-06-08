import httpStatus from 'http-status'
import supertest from 'supertest'
import {app} from '../../../app'

describe('Ping routes', () => {
  describe('GET /v1/ping', () => {
    it('should pong on success', () => {
      return supertest(app)
        .get('/v1/ping')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).toEqual({message: 'pong'})
        })
    })
  })
})
