const co = require('co')
const get = require('get-value')

module.exports = path => schema => function *(ctx, next) {
  const value = get(ctx, path)
}
