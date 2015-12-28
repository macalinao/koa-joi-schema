const co = require('co')
const expect = require('chai').expect
const validate = require('..')
const Joi = require('joi')

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
    })
  })

  it('should validate nested input', function *() {
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
    yield validator(ctx, next)
  })

  it('should error if path is missing', function *() {
    const ctx = {}
    const validator = validate('request.body')(Joi.object().keys({
      name: Joi.string()
    }))
    try {
      yield validator(ctx, next)
    } catch (e) {
      expect(e.message).to.equal('Path request.body is undefined for context.')
    }
  })

  it('should error on input not matching the schema', function *() {
    const ctx = {
      body: {
        password: 'boracay waling waling'
      }
    }
    const validator = validate('body')(Joi.object().keys({
      name: Joi.string().required()
    }))

    try {
      yield validator(ctx, next)
    } catch (e) {
      expect(e.isJoi).to.be.true
      expect(e.details.length).to.equal(1)
      expect(e.details[0].path).to.equal('name')
    }
  })

})
