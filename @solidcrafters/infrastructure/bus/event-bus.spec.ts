import test from 'tape'

import { newEventBus } from './event-bus'

test('simple event bus test', assert => {
  const bus = newEventBus()

  bus.listen((messageName, body) => {
    assert.equals(messageName, 'message:test')
    assert.deepEqual(body, 'Just a test')
  })

  bus.send('message:test', 'Just a test')

  assert.end()
})

test('a more complex event bus test', assert => {
  const bus = newEventBus()

  bus.listen((messageName, body) => {
    assert.equals(messageName, 'message:test')
    assert.deepEqual(body, { content: ['a', 'more', 'complex', 'test'] })
  })

  bus.send('message:test', { content: ['a', 'more', 'complex', 'test'] })

  assert.end()
})
