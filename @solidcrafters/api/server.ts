import { flow } from 'fp-ts/lib/function'

import { newEventBus } from '@solidcrafters/infrastructure/bus/event-bus'
import { logger } from '@solidcrafters/infrastructure/logger/winston-logger'
import { connectWebSocketServer, pushFromBus } from '@solidcrafters/push-server'

import { createApplication, startApplication } from './app'

const startServer: () => void = () => {
  const bus = newEventBus()

  flow(
    createApplication(logger),
    startApplication(logger),
    connectWebSocketServer(logger),
    pushFromBus(bus)
  )(bus)
}

startServer()
