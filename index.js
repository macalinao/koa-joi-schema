const co = require('co')
const get = require('get-value')
const promisify = require('es6-promisify')
const Joi = require('joi')

module.exports = path => schema => (ctx, next) => {
  const value = get(ctx, path)
  return promisify(Joi.validate)(value, schema)
    .then((result) => next())
    .catch(handleError(ctx))
}

const handleError = ctx => err => {
  ctx.joiError = err
}

module.exports.Joi = Joi
