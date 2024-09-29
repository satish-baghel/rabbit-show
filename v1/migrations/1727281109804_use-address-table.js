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
  pgm.createTable('user_address', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    address_1: { type: 'text', notNull: true },
    address_2: { type: 'text' },
    country_id: {
      type: 'uuid',
      notNull: true,
    },
    state_id: {
      type: 'uuid',
      notNull: true,
    },
    city: { type: 'text', notNull: true },
    zip_code: { type: 'varchar(100)', notNull: true },
    phone: { type: 'varchar(100)', notNull: true },
    arba_no: { type: 'varchar(100)', notNull: true },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
      notNull: true,
    },
  })
  pgm.createTrigger('user_address', 'set_update_date', {
    when: 'BEFORE',
    operation: 'UPDATE',
    level: 'ROW',
    function: {
      name: 'set_update_date',
    },
  })
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('user_address')
}
