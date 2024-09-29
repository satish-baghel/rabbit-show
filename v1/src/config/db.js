const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

// METHOD_FAILURE.expor pool
module.exports = pool
