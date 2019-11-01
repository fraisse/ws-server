import koa from 'koa'
import Router from 'koa-router'

import { EventBus } from '@solidcrafters/core/event-bus'
import { Logger } from '@solidcrafters/core/logger'
import { toString } from '@solidcrafters/core/utils'

import { Message, StatusCode } from './model'

const eventBusMiddleware: (logger: Logger) => (eventBus: EventBus) => koa.Middleware =
  logger => eventBus => async context => {
    const message: Message = context.request.body

    logger.info(`Send ${toString(message)} to to the event bus`)

    context.assert.ok(
      eventBus.send(message.name, message.content),
      StatusCode.INTERNAL_ERROR,
      `Cannot send message ${toString(message)}`
    )

    context.response.status = StatusCode.OK
    context.response.body = message.content
  }

const router: (logger: Logger) => (eventBus: EventBus) => Router =
  logger => eventBus => new Router()
    .post('/', eventBusMiddleware(logger)(eventBus))

export {
  router
}
