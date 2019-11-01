import util from 'util'

const toString = (value: any) => util.inspect(value, { depth: Infinity, showHidden: false })

export {
  toString
}
