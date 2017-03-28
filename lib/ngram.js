function ngram (ary, min, max) {
    min = min === undefined ? 2 : min
    min = min < 1 ? min = 1 : min
    max = max === undefined ? Infinity : max

    var combinations = []

    for (var i = min; i < ary.length && (ary.length - i) >= min && i <= max; ++i) {
        var possibleChunk = ary.slice(0, i)
        var rest = ary.slice(i, ary.length)
        var childCombinations = ngram(rest, min, max)

        childCombinations.forEach(function (childCombination) {
            combinations.push([possibleChunk].concat(childCombination))
        })
    }

    if (ary.length >= min && ary.length <= max) {
        combinations.push([ ary ])
    }

    return combinations
}

module.exports = ngram
