const { StatusCodes } = require('http-status-codes')
const pool = require('../config/db')
const createError = require('http-errors')

exports.query = async (query, values) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    const res = await client.query(query, values)
    await client.query('COMMIT')
    return res
  } catch (err) {
    await pool.query('ROLLBACK')
    const statusCode = err.statusCode
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR
    throw createError(statusCode, err)
  } finally {
    client.release(true)
  }
}
