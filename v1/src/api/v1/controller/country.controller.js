const { StatusCodes } = require('http-status-codes')
const pool = require('../../../config/db')
const _ = require('lodash')
exports.allCountry = async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    let sqlQuery = `SELECT * FROM country`
    const result = await await client.query(sqlQuery)
    await client.query('COMMIT')
    return res.status(StatusCodes.OK).json(_.get(result, 'rows'))
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: err?.message || 'error occur please try again later',
        error: err.message,
      })
  } finally {
    client.release(true)
  }
}
