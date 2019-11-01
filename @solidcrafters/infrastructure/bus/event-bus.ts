import EventEmitter from 'events'

import { EventBus } from '@solidcrafters/core/event-bus'

const BROADCAST_EVENT = 'broadcast'

const eventBus: (eventEmitter: EventEmitter) => EventBus =
  eventEmitter => ({
    listen: (listener) => {
      eventEmitter.on(BROADCAST_EVENT, listener)
      return eventBus(eventEmitter)
    },
    send: (name, body) => eventEmitter.emit(BROADCAST_EVENT, name, body)
  })

const newEventBus = () => eventBus(new EventEmitter())

export {
  newEventBus
}
