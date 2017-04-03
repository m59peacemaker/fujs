import test from 'tape'
import isSrslyObject from './'

function Foo() {}

test('isSrslyObject', t => {
  t.test('are objects', t => {
    t.true(isSrslyObject({}), '{}')
    t.true(isSrslyObject({foo: 123}), '{foo: 123}')
    t.true(isSrslyObject(Object.create(null)), 'Object.create(null)')
    t.true(isSrslyObject(Object.create({})), 'Object.create({})')
    t.true(isSrslyObject(Object.create(Object.prototype)))
    t.true(isSrslyObject(Object.create(null)))
    t.true(isSrslyObject(new Foo))
    t.true(isSrslyObject(new Foo()), 'from constructor')
    t.end()
  })

  t.test('are not srsly objects', t => {
    t.false(isSrslyObject(/foo/), 'regExp')
    t.false(isSrslyObject(null), 'null')
    t.false(isSrslyObject([]), '[]')
    t.false(isSrslyObject(new Array(10)), 'new Array(10)')
    t.false(isSrslyObject('foo'), "'foo'")
    t.false(isSrslyObject(undefined), 'undefined')
    t.false(isSrslyObject(true), 'true')
    t.false(isSrslyObject(Number()), 'Number()')
    t.false(isSrslyObject(1), '1')
    t.false(isSrslyObject(function () {}), 'function () {}')
    t.false(isSrslyObject(), 'nothing at all')
    t.end()
  })

  t.end()
})
