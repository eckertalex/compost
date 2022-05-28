import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import xss from 'xss-clean'
import compression from 'compression'
import httpStatus from 'http-status'
import {config} from './config/config'
import * as morgan from './config/morgan'
import {errorConverter, errorHandler} from './middlewares/error'
import {ApiError} from './utils/api-error'
import {routes} from './routes/v1'

export const app = express()

if (config.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({extended: true}))

// sanitize request data
app.use(xss())

// gzip compression
app.use(compression())

// enable cors
app.use(cors())

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((_res, _req, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)
