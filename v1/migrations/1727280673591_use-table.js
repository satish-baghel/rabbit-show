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
  pgm.createType('user_role', ['admin', 'user', 'secretary'])
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    first_name: { type: 'varchar(100)', notNull: true },
    last_name: { type: 'varchar(100)', notNull: true },
    email: { type: 'varchar(100)', notNull: true },
    password: { type: 'text', notNull: true },
    plain_password: {
      type: 'varchar(255)',
    },
    role: { type: 'user_role', notNull: true },
    acceptTermAndCondition: {
      type: 'timestamp',
      notNull: true,
    },
    is_deactivated: {
      type: 'smallint',
      default: 0,
    },
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

  pgm.createFunction(
    'set_update_date', // function name
    [], // function arguments
    {
      returns: 'trigger',
      language: 'plpgsql',
      replace: true, // equivalent to CREATE OR REPLACE
    },
    `
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    `
  )
  pgm.createTrigger('users', 'set_update_date', {
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
  pgm.dropTable('users')
  pgm.dropTrigger('users', 'user', {
    ifExists: true,
  })
  pgm.dropType('user_role')
  pgm.dropFunction('set_update_date', [], {
    ifExists: true,
  })
}
