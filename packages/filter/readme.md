Use it like this:

```js
import filter from '@fujs/filter'

const arr = [
    { number: 20 },
    { number: 12 },
    { number: 47 }
]
const bigEnough = obj => obj.number > 30
filter(bigEnough, arr) // => [{ number: 47 }]
```
