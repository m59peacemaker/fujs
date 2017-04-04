import test from 'tape'
import partial from './'

const fn = (a, b, c, d) => a + b + c + d

test('partial', t => {

  t.equal(typeof partial(fn, [1]), 'function', 'returns a function')

  t.test('applies given arguments', t => {
    t.equal(partial(fn, [ 1 ])(2, 3, 4), 10, 'one')
    t.equal(partial(fn, [ 1, 2, 3 ])(4), 10, 'many')
    t.equal(partial(fn, [ 1, 2, 3, 4 ])(500, 46), 10, 'all')
    t.equal(partial(fn, [ 1, 2, 3, 4, 5 ])(240), 10, 'more than fn.length')
    t.equal(partial(fn, [])(1, 2, 3, 4), 10, 'none')

    t.end()
  })

  t.test('partially applied fn has correct arity', t => {
    t.equal(partial(fn, []).length, 4)
    t.equal(partial(fn, [ 1 ]).length, 3)
    t.equal(partial(fn, [ 1, 2 ]).length, 2)
    t.equal(partial(fn, [ 1, 2, 3 ]).length, 1)

    t.end()
  })

  t.end()
})
