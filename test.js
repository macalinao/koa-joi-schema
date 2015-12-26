const co = require('co')
const expect = require('chai').expect
const validate = require('.')
const Joi = validate.Joi

const next = () => Promise.resolve(true)

describe('koa-joi-schema', () => {

  it('should validate input matching the schema', () => {
    const ctx = {
      body: {
        name: 'Test'
      }
    }
    const validator = validate('body')(Joi.object().keys({
      name: Joi.string()
    }))
    return co(function *() {
      yield validator(ctx, next)
      expect(ctx.joiError).to.be.undefined
    })
  })

  it('should validate nested input', () => {
    const ctx = {
      request: {
        body: {
          name: 'Test'
        }
      }
    }
    const validator = validate('request.body')(Joi.object().keys({
      name: Joi.string()
    }))
    return co(function *() {
      yield validator(ctx, next)
      expect(ctx.joiError).to.be.undefined
    })
  })

  it('should error on input not matching the schema', () => {
    const ctx = {
      body: {
        password: 'boracay waling waling'
      }
    }
    const validator = validate('body')(Joi.object().keys({
      name: Joi.string().required()
    }))
    return co(function *() {
      yield validator(ctx, next)
      expect(ctx.joiError.name).to.equal('ValidationError')
      expect(ctx.joiError.details.length).to.equal(1)
      expect(ctx.joiError.details[0].path).to.equal('name')
    })
  })

})
