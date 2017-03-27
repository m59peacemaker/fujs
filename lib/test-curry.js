import range from '../packages/range'
import isCurried from './is-curried'
import ngram from '../../ngram'

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
  test(`${name} - curries to: ${n}`, t => {
    ;(() => {
      const args = range(0, n)
      t.true(isCurried(curry(identityAll), args, args), 'curries a function')
    })()
    try {
      ;[
        [typeof curry(noop), 'function', 'returns a function'],
        [curry(noop).length, n, 'returned fn has same length as n curried to'],
        [typeof curry(identityAll)(), 'function', 'curriedFn returns fn when called without arg'],
        [typeof curry(identityAll)()()(), 'function', 'curriedFn returns function when called multiple times without args']
      ].forEach(set => t.equals(...set))

      ;(() => {
        const args = range(0, n)
        const curriedIdentityAll = curry(identityAll)

        t.deepEqual(
          invokeWithEach(args, curriedIdentityAll()()()),
          args,
          'calls fn when finally passed enough args'
        )

        invokeEveryWay(args, undefined, curriedIdentityAll).forEach(result => {
          t.deepEqual(result, args, 'curried fn worked correctly')
        })

        invokeEveryWay(args, ['foo', 'bar'], curriedIdentityAll).forEach(result => {
          const argsAndExtra = [...args, 'foo', 'bar']
          t.deepEqual(
            result,
            argsAndExtra,
            `passed along extra args | received args: ${result} | given args: ${argsAndExtra}`
          )
        })
      })()

    } catch (err) {
      t.fail(err)
    }
    t.end()
  })
}

export default testCurry
