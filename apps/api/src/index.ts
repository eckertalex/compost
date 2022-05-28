import * as http from 'http'
import {app} from './app'
import {logger} from './config/logger'
import {config} from './config/config'

let server: http.Server
server = app.listen(config.port, () => {
  logger.info(`Listening to ${config.port}`)
})

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

function unexpectedErrorHandler(error: Error) {
  logger.error(error)
  exitHandler()
}

function unhandledRejectionHandler(
  reason: Record<string, unknown> | null | undefined
) {
  logger.error(reason)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unhandledRejectionHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
