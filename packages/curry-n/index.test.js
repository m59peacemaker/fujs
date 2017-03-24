import test from 'tape'
import curryN from './'

const fn = (a, b, c, d) => a + b + c + d

test('curryN', t => {
  t.equal(typeof curryN(4, fn), 'function', 'returns a function')
  try {
    t.equal(curryN(4, fn)(1)(2)(3)(4), 10, 'curries to N')
  } catch (err) {
    t.fail('did not curry to N. ' + err.message)
  }
  t.test('returned fn has the correct arity', t => {
    t.equal(curryN(4, fn).length, 4, 'when curried to fn.length')
    t.equal(curryN(2, fn).length, 2, 'when curried to < fn.length')
    t.equal(curryN(6, fn).length, 6, 'when curried to > fn.length')
    t.equal(curryN(0, fn).length, 0, 'curried to zero')
    t.end()
  })
  t.test('fns have correct arity as arguments are added', t => {
    t.equal(curryN(4, fn)().length, 4, 'when no argument given')
    t.equal(curryN(4, fn)()()()()()().length, 4, 'when no argument given multiple times')
    t.equal(curryN(4, fn)()(1)(2).length, 2, 'none given, then some')
    t.equal(curryN(4, fn)(1).length, 3, 'when first argument given')
    t.equal(curryN(4, fn)(1)(2)(3).length, 1, 'when many arguments given')
    t.end()
  })

  t.test('forwards extra arguments', t => {
    const f = (...args) => args
    const g = curryN(3, f)

    t.deepEqual(g(1, 2, 3), [1, 2, 3])
    t.deepEqual(g(1, 2, 3, 4), [1, 2, 3, 4])
    t.deepEqual(g(1, 2)(3, 4), [1, 2, 3, 4])
    t.deepEqual(g(1)(2, 3, 4), [1, 2, 3, 4])
    t.deepEqual(g(1)(2)(3, 4), [1, 2, 3, 4])
    t.end()
  })

  t.test('preserves context', t => {
    var ctx = {x: 10}
    var f = function (a, b) { return a + b + this.x }
    var g = curryN(2, f)
    t.equal(curryN(2, f.bind(ctx))(2, 4), 16, "doesn't change given function's context")
    t.equal(g.call(ctx, 2, 4), 16, 'curried fn can be called with different context')
    t.equal(g.call(ctx, 2).call({x: 20}, 4), 26, 'called with different context with each arg')
    t.end()
  })

  t.test('is curried', t => {
    const curry4 = curryN(4)
    const f = curry4(fn)
    t.equal(f.length, 4)
    t.equal(f(1)(43).length, 2)
    t.equal(f(1)(2)(3)(4), 10)
    t.equal(f(1, 2, 3)(4), 10)
    t.end()
  })

  t.end()
})
