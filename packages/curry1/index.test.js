import test from 'tape'
import curry1 from './'

const inc = a => a + 1

test('curry1', t => {
  t.equal(typeof curry1(inc), 'function', 'returns a function')
  t.equal(curry1(inc).length, 1, 'returned fn has a length of 1')
  t.equal(typeof curry1(inc)(), 'function', 'returns function when call without arg')
  t.equal(typeof curry1(inc)()()(), 'function', 'returns function when called multiple times without args')
  t.equal(curry1(inc)()()()(5), 6, 'calls fn when passed argument')
  t.equal(curry1((...args) => args)('a', 'b', 'c').join(''), 'abc', 'passes on extra args')
  try {
    t.equal(curry1()()()()(inc)(9), 10, 'curry1 is curried')
  } catch (err) {
    t.fail('curry1 is not curried!')
  }
  t.end()
})
