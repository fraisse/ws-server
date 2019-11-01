import test from 'tape'

import { isMessage } from './check-message'

test('isMessage should return true for an object with a name and a content', assert => {
  const message = {
    name: 'channel',
    content: 'ok'
  }
  assert.true(isMessage(message))
  assert.end()
})

test('isMessage should return false for an object without name', assert => {
  const message = {
    content: 'ok'
  }
  assert.false(isMessage(message))
  assert.end()
})

test('isMessage should return false for an object without content', assert => {
  const message = {
    name: 'test'
  }
  assert.false(isMessage(message))
  assert.end()
})
