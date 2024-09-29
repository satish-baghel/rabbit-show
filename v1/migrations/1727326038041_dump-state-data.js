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
  pgm.sql(
    `INSERT INTO state (country_id,state_name,state_code,is_deactivated)
    VALUES
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Alabama','AL',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Alaska','AK',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Arizona','AZ',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Arkansas','AR',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','California','CA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Colorado','CO',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Connecticut','CT',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Delaware','DE',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Florida','FL',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Georgia','GA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Hawaii','HI',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Idaho','ID',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Illinois','IL',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Indiana','IN',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Iowa','IA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Kansas','KS',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Kentucky','KY',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Louisiana','LA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Maine','ME',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Maryland','MD',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Massachusetts','MA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Michigan','MI',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Minnesota','MN',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Mississippi','MS',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Missouri','MO',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Montana','MT',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Nebraska','NE',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Nevada','NV',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','New Hampshire','NH',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','New Jersey','NJ',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','New Mexico','NM',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','New York','NY',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','North Carolina','NC',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','North Dakota','ND',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Ohio','OH',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Oklahoma','OK',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Oregon','OR',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Pennsylvania','PA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Rhode Island','RI',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','South Carolina','SC',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','South Dakota','SD',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Tennessee','TN',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Texas','TX',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Utah','UT',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Vermont','VT',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Virginia','VA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Washington','WA',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','West Virginia','WV',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Wisconsin','WI',0),
    ('cabc9b3e-c4eb-4a1c-8ad8-18392bc60ba1','Wyoming','WY',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Ontario','ON',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Quebec','QC',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Nova Scotia','NS',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','New Brunswick','NB',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Manitoba','MB',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','British Columbia','BC',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Prince Edward Island','PE',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Saskatchewan','SK',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Alberta','AB',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Newfoundland and Labrador','NL',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Northwest Territories','NT',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Yukon','YT',0),
    ('e7223ebe-1882-4c3e-8b55-b109e2979417','Nunavut','NU',0)`
  )
}

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`TRUNCATE TABLE state`)
}
