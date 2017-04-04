import test from 'tape'
import lens from '../lens'
import over from './'

test('over', t => {
  {
    const aLens = lens(
      data => data[0],
      (v, data) => {
        data[1] = v
        return data
      }
    )
    t.deepEqual(
      over(aLens, v => v + 1, [ 100, 200, 300 ]),
      [ 100, 101, 300 ],
      'got value from lens getter, transformerd it with fn, and set it with setter'
    )
  }

  t.end()
})
