import { Server } from 'socket.io'

import { EventBus } from '@solidcrafters/core/event-bus'

const pushFromBus: (eventBus: EventBus) => (server: Server) => void =
  eventBus => server => eventBus.listen((messageName, body) => server.emit(messageName, body))

export {
  pushFromBus
}
