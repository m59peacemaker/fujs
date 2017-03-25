import test from 'tape'
import srslyObject from './srsly-object'

function Foo() {}

test('srslyObject', t => {
  t.test('are objects', t => {
    t.true(srslyObject({}), '{}')
    t.true(srslyObject({foo: 123}), '{foo: 123}')
    t.true(srslyObject(Object.create(null)), 'Object.create(null)')
    t.true(srslyObject(Object.create({})), 'Object.create({})')
    t.true(srslyObject(Object.create(Object.prototype)))
    t.true(srslyObject(Object.create(null)))
    t.true(srslyObject(/foo/), 'regExp')
    t.true(srslyObject(new Foo))
    t.true(srslyObject(new Foo()), 'from constructor')
    t.end()
  })

  t.test('are not objects', t => {
    t.false(srslyObject(null), 'null')
    t.false(srslyObject([]), '[]')
    t.false(srslyObject(new Array(10)), 'new Array(10)')
    t.false(srslyObject('foo'), "'foo'")
    t.false(srslyObject(undefined), 'undefined')
    t.false(srslyObject(true), 'true')
    t.false(srslyObject(Number()), 'Number()')
    t.false(srslyObject(1), '1')
    t.false(srslyObject(function () {}), 'function () {}')
    t.false(srslyObject(), 'nothing at all')
    t.end()
  })

  t.end()
})
