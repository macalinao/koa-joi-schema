const co = require('co')
const get = require('get-value')
const promisify = require('es6-promisify')
const Joi = require('joi')

module.exports = path => schema => (ctx, next) => {
  const value = get(ctx, path)
  if (typeof value === 'undefined') throw new Error(`Path ${path} is undefined for context.`)
  return promisify(Joi.validate)(value, schema)
    .catch((err) => { throw err })
    .then((result) => next())
}
