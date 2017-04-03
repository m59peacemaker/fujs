import test from 'tape'
import compose from './'

test('compose', t => {
  t.equal(
    compose(
      v => v + 'a',
      v => v + 1
    )(2),
    '3a'
  )
  t.end()
})
