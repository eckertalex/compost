import {Request, Response} from 'express'
import morgan from 'morgan'
import {config} from './config'
import {logger} from './logger'

morgan.token(
  'message',
  (_req: Request, res: Response) => res?.locals?.errorMessage || ''
)

function getIpFormat() {
  return config.env === 'production' ? ':remote-addr - ' : ''
}

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

export const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response): boolean => res.statusCode >= 400,
  stream: {
    write: (message: string): void => {
      logger.info(message.trim())
    },
  },
})

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response): boolean => res.statusCode < 400,
  stream: {
    write: (message: string): void => {
      logger.error(message.trim())
    },
  },
})
