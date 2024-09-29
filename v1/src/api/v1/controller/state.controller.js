const { StatusCodes } = require('http-status-codes')
const pool = require('../../../config/db')
const _ = require('lodash')
exports.allState = async (req, res) => {
  const { country_id } = req.query
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    let sqlQuery = `SELECT * FROM state`
    const queryValues = []
    sqlQuery += ` WHERE is_deactivated = 0`
    if (country_id) {
      queryValues.push(country_id)
      sqlQuery += ` AND country_id = $${queryValues.length}`
    }
    const result = await await client.query(sqlQuery, queryValues)

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
