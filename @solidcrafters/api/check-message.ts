import koa from 'koa'
import 'koa-body'

import { Message, StatusCode } from './model'

const isMessage: (object: any) => object is Message =
  (object): object is Message => {
    return object.content != null && object.name != null
  }

const checkMessageMiddleware: () => koa.Middleware =
  () => async (context, next) => {
    const message = context.request.body
    context.assert.ok(
      isMessage(message),
      StatusCode.BAD_REQUEST,
      'wrong message format, need to contain a name and a content properties'
    )
    await next()
  }

export {
  checkMessageMiddleware,
  isMessage
}
