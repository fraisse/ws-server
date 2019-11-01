import Application from 'koa'
import koaBody from 'koa-body'
import Router from 'koa-router'
import http from 'http'

import { Logger } from '@solidcrafters/core/logger'
import { EventBus } from '@solidcrafters/core/event-bus'

import { checkMessageMiddleware } from './check-message'
import { router as eventBusRouter } from './event-bus-router'

const createRouting: (logger: Logger) => (eventBus: EventBus) => Router =
  logger => eventBus => new Router()
    .use('/message', eventBusRouter(logger)(eventBus).routes())

const createApplication: (logger: Logger) => (eventBus: EventBus) => Application<any, any> =
  logger => eventBus => new Application()
    .use(koaBody({ multipart: true }))
    .use(checkMessageMiddleware())
    .use(createRouting(logger)(eventBus).routes())

const startApplication: (logger: Logger) => (application: Application) => http.Server =
  logger => application => {
    application
      .listen(3333)
      .on('listening', () => logger.info(`Http server started on port 3333`))

    return http
      .createServer(application.callback())
      .listen(4444)
      .on('listening', () => logger.info(`Websocket server started on port 4444`))
  }

export {
  createApplication,
  startApplication
}
