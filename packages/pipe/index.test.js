import test from 'tape'
import pipe from './'

test('pipe', t => {
  t.equal(
    pipe(
      v => v + 1,
      v => v + 'a'
    )(2),
    '3a'
  )
  t.end()
})
