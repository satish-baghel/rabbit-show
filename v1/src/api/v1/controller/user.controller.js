const { StatusCodes } = require('http-status-codes')
const pool = require('../../../config/db')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
// User Register
exports.userRegister = async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const {
      first_name,
      last_name,
      email,
      password,
      address_1,
      address_2,
      country_id,
      state_id,
      city,
      zip_code,
      phone_no,
      arba_no,
      role,
      accept_terms_and_condition,
    } = req.body
    const isEmailExist = await client.query(
      `SELECT * FROM users WHERE is_deactivated = 0 AND email LIKE $1 AND role = $2`,
      [email, role]
    )

    if (_.size(isEmailExist?.rows)) {
      throw createError(StatusCodes.CONFLICT, 'Email already exist')
    }

    /////////////////////////////////////////////

    let sqlQuery = `INSERT INTO users (
      first_name,
      last_name,
      email,
      password,
      plain_password,
      phone_no,
      role,
      accept_terms_and_condition,
      arba_no) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`

    ///////////////////////////////
    const saltRounds = 10
    const hasPassword = await bcrypt.hash(password, saltRounds)

    /////////////////////////////////
    const queryValues = [
      first_name,
      last_name,
      email,
      hasPassword,
      password,
      phone_no,
      'user',
      accept_terms_and_condition,
      arba_no,
    ]

    const { rows } = await client.query(sqlQuery, queryValues)

    //////////////////////////////////////////////////////////////

    const addressSqlQuery = `INSERT INTO user_address (
      address_1,
      address_2,
      country_id,
      state_id,
      city,
      zip_code,
      user_id
      ) values ($1, $2, $3, $4, $5, $6, $7) `
    const user_id = _.get(_.first(rows), 'id')
    const addressQueryValues = [
      address_1,
      address_2,
      country_id,
      state_id,
      city,
      zip_code,
      user_id,
    ]
    await client.query(addressSqlQuery, addressQueryValues)

    /////////////////////////////////////

    const encryptBody = {
      id: user_id,
    }

    var encrypted = await CryptoJS.AES.encrypt(
      JSON.stringify(encryptBody),
      process.env.CRYPTO_JS_TOKEN
    ).toString()

    const userCodeSqlQuery = `INSERT INTO user_email_code 
    (code, user_id)
    values 
    ($1, $2)`
    await client.query(userCodeSqlQuery, [encrypted, user_id])

    //
    await client.query('COMMIT')
    return res
      .status(StatusCodes.OK)
      .json('Email has been sent successfully. Please verify your account')
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err?.message || 'error occur please try again later')
  } finally {
    client.release(true)
  }
}

//

exports.checkEmail = async (req, res) => {
  const client = await pool.connect()
  try {
    const { email, role } = req.body
    const { rows } = await client.query(
      `SELECT * FROM users WHERE is_deactivated = 0 AND email = $1 AND role = $2`,
      [email, role]
    )

    const result = _.first(rows)

    await client.query('COMMIT')

    return res.status(StatusCodes.OK).json({
      is_exist: Boolean(result),
      account_status: result?.user_status === 1 ? 'VERIFIED' : 'UNVERIFIED',
    })
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err?.message || 'error occur please try again later')
  } finally {
    client.release(true)
  }
}

exports.verifyEmail = async (req, res) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const { user_code } = req.body

    console.log(
      `🚀 ~ file: user.controller.js:162 ~ exports.verifyEmail= ~ user_code:`,
      user_code
    )
    // const
    const findToken = await client.query(
      `SELECT * FROM user_email_code where code = $1`,
      [user_code]
    )

    const tokenUser = _.first(findToken.rows)

    console.log(
      `🚀 ~ file: user.controller.js:168 ~ exports.verifyEmail= ~ tokenUser:`,
      tokenUser
    )

    if (!_.size(tokenUser)) {
      throw createError(498, 'Invalid or expired token')
    }

    await client.query(`UPDATE users SET user_status = 1 WHERE id = $1`, [
      tokenUser.user_id,
    ])
    await client.query(`DELETE FROM user_email_code WHERE user_id = $1`, [
      tokenUser.user_id,
    ])

    await client.query('COMMIT')
    return res.status(StatusCodes.OK).json('Email has been verify successfully')
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err?.message || 'error occur please try again later')
  } finally {
    client.release(true)
  }
}

exports.loginUser = async (req, res) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const { email, password } = req.body
    // const
    const findUserData = await client.query(
      `SELECT * FROM users where email LIKE $1`,
      [`%${email}%`]
    )
    const findUser = _.first(findUserData.rows)
    if (!_.size(findUser)) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'The email or password you entered is incorrect or does not exist. Please check your credentials and try again.'
      )
    }
    const comparePassword = await bcrypt.compare(password, findUser.password)
    if (!comparePassword) {
      throw createError(
        StatusCodes.UNAUTHORIZED,
        'The email or password you entered is incorrect or does not exist. Please check your credentials and try again.'
      )
    }
    const accessToken = jwt.sign(
      {
        id: findUser?.id,
      },
      process?.env?.JWT_TOKEN,
      { expiresIn: '2d' }
    )
    const refreshToken = jwt.sign(
      {
        id: findUser?.id,
      },
      process?.env?.JWT_TOKEN || 'test'
    )
    await client.query('COMMIT')
    return res.status(StatusCodes.OK).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      data: _.omit(findUser, ['password', 'plain_password']),
    })
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err?.message || 'error occur please try again later')
  } finally {
    client.release(true)
  }
}

exports.refreshToken = async (req, res) => {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const { refreshToken } = req.body

    const userDecode = jwt.verify(refreshToken, process?.env?.JWT_TOKEN)
    if (!userDecode) {
      createError(498, 'Invalid token')
    }
    let result = await client.query(`SELECT * FROM users where id = $1`, [
      userDecode?.id,
    ])
    result = _.first(result.rows)
    const accessToken = jwt.sign(
      {
        id: result?.id,
      },
      process?.env?.JWT_TOKEN,
      { expiresIn: '2d' }
    )
    const newRefreshToken = jwt.sign(
      {
        id: result?.id,
      },
      process?.env?.JWT_TOKEN || 'test'
    )
    await client.query('COMMIT')
    return res.status(StatusCodes.OK).json({
      accessToken: accessToken,
      refreshToken: newRefreshToken,
      data: _.omit(result, ['password', 'plain_password']),
    })
  } catch (err) {
    await pool.query('ROLLBACK')
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(err?.message || 'error occur please try again later')
  } finally {
    client.release(true)
  }
}
