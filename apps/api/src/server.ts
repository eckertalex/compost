import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export function createServer() {
  return express()
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({message: `hello ${req.params.name}`})
    })
    .get('/healthz', (req, res) => {
      return res.json({ok: true})
    })
}
