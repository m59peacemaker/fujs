const fs = require('fs')
const glob = require('glob')
const Remarkable = require('remarkable')

const md = new Remarkable()

const docs = glob
    .sync('./packages/**/readme.md')
    .map(file => md.render(fs.readFileSync(file, { encoding: 'utf8' })))
    .join('\n\n')

fs.writeFileSync(
    './docs/index.html',
    fs.readFileSync('./docs/template.html', { encoding: 'utf8' }).replace('<!-- content -->', docs)
)
