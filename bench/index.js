#!/usr/bin/env node
require('babel-register')
const { spawn } = require('child_process')

const bench = process.argv.slice(2)[0]
if (bench) {
  spawn('node', [ '-r', 'babel-register', '-r', `./${bench}`, '-e', ''], { stdio: 'inherit' })
}
