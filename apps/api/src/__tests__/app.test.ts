import supertest from 'supertest'
import {app} from '../app'

describe('app', () => {
  it('health check returns 200', async () => {
    await supertest(app)
      .get('/v1/ping')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({message: 'pong'})
      })
  })
})
