/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // 1 active, 2 in-active, 3 email not verified
  pgm.addColumns('users', {
    user_status: {
      type: 'smallint',
      default: 3,
    },
    arba_no: {
      type: 'varchar(65)',
    },
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropColumns('users', ['user_status', 'arba_no'])
}
