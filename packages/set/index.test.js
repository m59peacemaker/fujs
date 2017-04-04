import test from 'tape'
import lens from '../lens'
import set from './'

test('set', t => {
  {
    const aLens = lens(
      () => {},
      (v, data) => {
        data[1] = v
        return data
      }
    )
    t.deepEqual(
      set(aLens, 101, [ 100, 200, 300 ]),
      [ 100, 101, 300 ],
      'set new value with lens setter'
    )
  }

  t.end()
})
