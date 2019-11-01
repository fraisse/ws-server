import socketio from 'socket.io'
import { Server } from 'http'
import { flow } from 'fp-ts/lib/function'

import { Logger } from '@solidcrafters/core/logger'

const addDebugLogs: (logger: Logger) => (server: socketio.Server) => socketio.Server =
  logger => server => {
    server
      .on('connection', socket => {
        logger.info(`New connection [id=${socket.id}]`)

        socket.on('disconnect', () => {
          logger.info(`Client gone [id=${socket.id}]`)
        })
      })
    return server
  }

const createWebSocketServer: (server: Server) => socketio.Server = socketio

const connectWebSocketServer: (logger: Logger) => (server: Server) => socketio.Server =
  logger => flow(
    createWebSocketServer,
    addDebugLogs(logger)
  )

export {
  connectWebSocketServer
}
