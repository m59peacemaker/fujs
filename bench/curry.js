'use strict'

import Benchmark from 'benchmark'
// import fastCurry from '../packages/curry'
import fastCurry from 'fast-curry'
//import myCurry from '../packages/curry-n/core'
import myCurry from '../packages/curry'
import range from '../packages/range'
const suite = new Benchmark.Suite();

let sum;
let addOne;
let res;

// TODO: move to packages/curry
// compare with fast-curry and instant-curry
// note that fast-curry and instant-curry are not fully operational curries (arity/context/restArgs)
// breakup curryN core differently, make regular curry
// expose curry1, 2, 3, 4, benchmark them!

suite
  .add("myCurry.create", function() {
      sum = myCurry(2, function(a, b) { return a + b; });
  })
  .add("myCurry.lift", function() {
      addOne = sum(1);
  })
  .add("myCurry.call", function() {
      res = addOne(2);
  })
  .add("fastCurry.create", function() {
      sum = fastCurry(function(a, b) { return a + b; });
  })
  .add("fastCurry.lift", function() {
      addOne = sum(1);
  })
  .add("fastCurry.call", function() {
      res = addOne(2);
  })
    .on('error', function (err) {
      console.log(err)
      process.exit()
    })

  .on("cycle", function(event) {
      console.log(String(event.target));
  })
  .run({ "async": true });

/*

let curriedFn
let partiallyApplied
let result

const sum = (...args) => args.reduce((acc, v) => acc + v, 0)
const setLength = (length, fn) => {
  const f = function () { return fn.apply(undefined, arguments) }
  Object.defineProperty(f, 'length', { get: () => length })
  return f
}

const benchCurryNs = curries => {
  const suite = new Benchmark.Suite()

  for (let i = 1; i <= 5; ++i) {
    const fn = setLength(i, sum)
    curries.forEach(curry => {
      suite.add(`create ${i} ${curry.name}`, () => {
        curriedFn = curry.fn(i, fn)
      })
      if (i < 2) {
        suite.add(`called ${i} ${curry.name}`, () => {
          result = curriedFn(1)
        })
      } else {
        suite.add(`partial ${i} ${curry.name}`, () => {
          partiallyApplied = curriedFn(1)
        })
        suite.add(`called ${i} ${curry.name}`, () => {
          result = partiallyApplied(...range(1, i))
        })
      }
    })
  }
  suite
    .on('error', function (err) {
      console.log(err)
      process.exit()
    })
    .on("cycle", function(event) {
        console.log(String(event.target))
    })
    .run({ "async": true })
}

benchCurryNs([
  // { name: 'fastCurry', fn: (length, fn) => fastCurry(fn) },
  { name: 'fastCurry', fn: fastCurry },
  { name: 'myCurry', fn: myCurry }
])
*/
