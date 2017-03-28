import range from '../packages/range'
import isCurried from './is-curried'
import ngram from './ngram'

const noop = () => {}
const identityAll = (...a) => a

const invokeEveryWay = (args, extraArgs = [], fn) => {
  var setsOfArgCombinations = ngram(args, 1)
  return setsOfArgCombinations.map(combinations => {
    return combinations.reduce((acc, args, idx) => {
      if (idx === combinations.length - 1) {
        return acc(...args, ...extraArgs)
      }
      return acc(...args)
    }, fn)
  })
}

const invokeWithEach = (args, fn) => args.reduce((acc, v) => acc(v), fn)

const testCurry = ({name, curry, n, test}) => {
  if (n === 0) {
    test(`${name} throws if asked to curry to 0`, t => {
      try {
        curry(() => {})
        t.fail()
      } catch (err) {
        t.pass()
      }
      return t.end()
    })
    return
  }

  test(`${name} throws when "fn" is not a function`, t => {
    try {
      curry([])
      t.fail()
    } catch (err) {
      t.pass()
    }
    t.end()
  })

  test(`${name} - curries to: ${n}`, t => {

    const nArgs = range(0, n)
    const curriedIdentityAll = curry(identityAll)

    t.true(isCurried(curriedIdentityAll, nArgs, nArgs), 'curries a function')

    try {
      ;[
        [typeof curry(noop), 'function', 'returns a function'],
        [curry(noop).length, n, 'returned fn has same length as n curried to'],
        [typeof curriedIdentityAll(), 'function', 'curriedFn returns fn when called without arg'],
        [typeof curriedIdentityAll()()(), 'function', 'curriedFn returns function when called multiple times without args']
      ].forEach(set => t.equals(...set))

      t.deepEqual(
        invokeWithEach(nArgs, curriedIdentityAll()()()),
        nArgs,
        'calls fn when finally passed enough args'
      )

      invokeEveryWay(nArgs, undefined, curriedIdentityAll).forEach(result => {
        t.deepEqual(result, nArgs, 'curried fn worked correctly')
      })

      invokeEveryWay(nArgs, ['foo', 'bar'], curriedIdentityAll).forEach(result => {
        const argsAndExtra = [...nArgs, 'foo', 'bar']
        t.deepEqual(
          result,
          argsAndExtra,
          `passed along extra args | passed args: ${argsAndExtra} | got back args: ${result}`
        )
      })

      t.test('does not cache/remember extra args from previous calls', t => {
        curriedIdentityAll(...nArgs, ...nArgs) // called with more than n args
        t.deepEqual(
          curriedIdentityAll(...nArgs), nArgs,
          'did not remember extra args from previous call'
        )
        const mid = Math.ceil((n - 1) / 2)
        const f = curriedIdentityAll(...range(0, mid))(...range(mid, n - 1))
        f('uh', 'oh', 'man', 'not', 'cool')
        t.deepEqual(
          f(n - 1),
          nArgs,
          'did not remember extra args from previous call(s)'
        )
        t.end()
      })

      t.test('preserves context', t => {
        const f = function () { return this.x }
        const fc = curry(f.bind({ x: 10 }))
        const returnThis = function () { return this }

        t.equal(fc(...nArgs), 10, "doesn't change given function's context")
        t.equal(invokeWithEach(range(0, n), fc), 10, "doesn't change given function's context")
        t.equal(
          curry(f).apply({ x: 15 }, nArgs),
          15,
          'curried fn can be called with different context'
        )

        const lastContext = nArgs.reduce((acc, v) => acc.call(v, v), curry(returnThis))
        t.equal(
          Number(lastContext),
          nArgs[nArgs.length - 1],
          'called with different context with each arg'
        )
        t.end()
      })


    } catch (err) {
      t.fail(err)
    }
    t.end()
  })
}

export default testCurry
