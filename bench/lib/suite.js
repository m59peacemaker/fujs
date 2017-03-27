import { Suite } from 'benchmark'

const makeSuite = () => new Suite({ async: true })
  .on('cycle', event => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    // console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .on('error', err => {
    console.error(err)
  })

export default makeSuite
