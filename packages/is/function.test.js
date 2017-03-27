import test from 'tape'
import isFunction from './function'

test('isFunction', t => {
  t.equal(isFunction(() => {}), true)
  t.equal(isFunction(function () {}), true)
  t.equal(isFunction(new Function()), true)
  t.equal(isFunction({}), false)
  t.end()
})
