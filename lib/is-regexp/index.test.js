import test from 'tape'
import isRegExp from './'

const toStringRegex = () => '[object RegExp]'

test('isRegExp', t => {
  t.true(isRegExp(/./), 'literal')
  t.true(isRegExp(new RegExp('foo')), 'constructor')
  t.true(isRegExp(RegExp('foo')), 'factory')

  t.false(isRegExp(new String('abc')))
  t.false(isRegExp({toString: toStringRegex}))
  t.false(isRegExp({__proto__: {toString: toStringRegex}}))

  t.end()
})
