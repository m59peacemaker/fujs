import test from 'tape'
import lens from './'
import compose from '../compose'

const isLensObject = v => v && typeof v.get === 'function' && typeof v.set === 'function'

test('lens', t => {
  // these are terrible lenses and not really lens-y. It's just for testing composition.
  const aLens = lens(
    data => data[0],
    (v, data) => data[0] = v
  )
  const bLens = lens(
    data => data + '1',
    (v, data) => data + v
  )
  const cLens = compose(aLens, bLens)
  t.equal(typeof aLens, 'function', 'created lens is a function')
  t.true(isLensObject(aLens()), 'invoking lens returns object with "get" and "set" properties')

  t.equal(cLens().get([ 'a', 'b', 'c' ]), 'a1', 'lenses compose "get" method')

  // aLens is going to set the item at 0, bLens is going to get that item as its data to set
  t.equal(cLens().set('123', [ 'a', 'b', 'c' ]), 'a123', 'lenses compose "set" method')

  t.end()
})
