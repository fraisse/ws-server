type MessageName = string

type EventListener = <Body = any>(messageName: MessageName, body: Body) => void

type EventBus = {
  listen: (listener: EventListener) => EventBus
  send: <Body = any>(name: MessageName, body: Body) => boolean
}

export {
  EventBus,
  EventListener
}
