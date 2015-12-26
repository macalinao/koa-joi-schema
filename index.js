const co = require('co')
const get = require('get-value')
const promisify = require('es6-promisify')
const Joi = require('joi')

module.exports = path => schema => (ctx, next) => {
  const value = get(ctx, path)
  return promisify(Joi.validate)(value, schema)
    .then((result) => next())
    .catch((err) => { throw new JoiError(err) })
}

function JoiError(err) {
  Object.assign(this, err)
}
JoiError.prototype = Error.prototype

module.exports.Joi = Joi
module.exports.JoiError = JoiError
