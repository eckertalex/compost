import supertest from 'supertest'
import {app} from '../app'

describe('app', () => {
  it('health check returns 200', async () => {
    await supertest(app)
      .get('/v1/healthz')
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true)
      })
  })

  it('healthz message endpoint says hello', async () => {
    await supertest(app)
      .get('/v1/healthz/message/jared')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({message: 'hello jared'})
      })
  })
})
