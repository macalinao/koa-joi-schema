# koa-joi-schema

[![npm version](https://badge.fury.io/js/koa-joi-schema.svg)](https://badge.fury.io/js/koa-joi-schema)
[![Build Status](https://travis-ci.org/simplyianm/koa-joi-schema.svg)](https://travis-ci.org/simplyianm/koa-joi-schema)

Koa middleware to validate input using [Joi][joi].

## Installing

```
npm i -S koa-joi-schema joi
```

Note: Joi is a peer dependency, so it must be installed independently.

## Usage

See [test.js](test/test.js) for more examples.

```javascript
const validate = require('koa-joi-schema')
const Joi = require('joi')

// Creates a validator for 'ctx.request.body'.
// Use dot notation to validate anything on the context.
const validator = validate('request.body')(Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
}))

const validationErrorHandler = (ctx, next) => {
  try {
    yield next()
  } catch (e) {
    if (!e.isJoi) throw e
    ctx.status = 400 // invalid input
    ctx.body = {
      error: 'Invalid input',
      reason: e
    }
  }
}

router.post('/users', bodyParser, validationErrorHandler, validator, usersCtrl.create)
```

## License

ISC

[joi]: https://github.com/hapijs/joi
