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
  pgm.dropColumns('user_address', ['phone', 'arba_no'])
  pgm.addColumns('user_address', {
    user_id: {
      type: 'uuid',
      notNull: true,
    },
  })
  //  phone: { type: 'varchar(100)', notNull: true },
  // arba_no: { type: 'varchar(100)', notNull: true },
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.addColumns('user_address', {
    phone: { type: 'varchar(100)', notNull: true },
    arba_no: { type: 'varchar(100)', notNull: true },
  })
  pgm.dropColumns('user_address', ['user_id'])
}
