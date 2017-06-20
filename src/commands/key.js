var Dat = require('dat-node')
var parseArgs = require('../parse-args')
var debug = require('debug')('dat')

module.exports = {
  name: 'key',
  command: key,
  help: [
    'Print key for a dat.',
    '',
    'Usage: dat key [dir]'
  ].join('\n'),
  options: []
}

function key (opts) {
  debug('dat key')
  if (!opts.dir) {
    opts.dir = parseArgs(opts).dir || process.cwd()
  }
  opts.createIfMissing = false // sync must always be a resumed archive

  Dat(opts.dir, opts, function (err, dat) {
    if (err && err.name === 'MissingError') {
      console.error('Sorry, could not find a dat in this directory.')
      process.exit(1)
    } else if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`dat://${dat.key.toString('hex')}`)
    process.exit(0)
  })
}
