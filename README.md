# FUnctional JavaScript

A functional programming toolbox aimed at authors of npm libraries.

## Design goals

Exposed functions should

- be pure
- be curried
- expect a set number of arguments (fixed arity)
- expose the correct number of expected arguments via `fn.length`
- check the types of their arguments
- be performant

An ES6 module is exported from the monorepo to facilitate tree-shaking.

Individual functions are exposed via CommonJS in their own modules via `require('@fujs/function-name')`, or from the monorepo with `require('fujs/functionName')`.
