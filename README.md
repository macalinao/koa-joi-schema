# koa-joi-schema

[![Build Status](https://travis-ci.org/simplyianm/koa-joi-schema.svg)](https://travis-ci.org/simplyianm/koa-joi-schema)

Koa middleware to validate input/output using [Joi][joi].

## Usage

See [test.js](test.js) for more examples.

```javascript
const validate = require('koa-joi-schema')

const validator = validate('body')(Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string()..regex(/^[a-zA-Z0-9]{3,30}$/).required()
}))

const errorHandler = (ctx, next) => {
  if (ctx.joiError) { // Joi error object
    ctx.body = {
      error: 'Invalid input'
    }
    return
  }
  yield next()
}

router.post('/users', bodyParser, validator, errorHandler, usersCtrl.create)
```

## License

ISC

[joi]: https://github.com/hapijs/joi
