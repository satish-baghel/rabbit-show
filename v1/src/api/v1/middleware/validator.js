const createError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const Validator = (validationSchema) => async (req, res, next) => {
  try {
    const file = req.file
    const data = req.body
    const query = req.query
    const body = {
      ...data,
    }
    if (file) {
      body[file.fieldname] = {
        ...file,
      }
    }

    ///////////////////////////////////////////
    if (validationSchema?.query) {
      const validationQuery = await validationSchema.query.validate(query, {
        abortEarly: false,
      })
      req.query = validationQuery.value
      if (validationQuery.error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          error_location: 'query',
          error: validationQuery.error,
        })
      }
    }

    // ////////////////////////////////////////
    if (validationSchema?.body) {
      const validationBody = await validationSchema.body.validate(body, {
        abortEarly: false,
      })

      req.body = validationBody.value
      if (validationBody.error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          error_location: 'body',
          error: validationBody.error,
        })
        // .json(validationBody.error)
      }
    }

    next()
  } catch (err) {
    // errorLogger(err, req, res, next)
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err.message)
  }
}

module.exports = Validator
