import test from 'tape'
import lens from '../lens'
import view from './'

test('set', t => {
  {
    const aLens = lens(
      data => data[1],
      () => {}
    )
    t.deepEqual(
      view(aLens, [ 100, 200, 300 ]),
      200,
      'viewed the lensed data'
    )
  }

  t.end()
})
