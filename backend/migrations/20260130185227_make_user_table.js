/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id', 36).primary();
    table.string('username', 100).notNullable().unique();
    table.string('email', 100).notNullable().unique();
    table.enu('role', ['user', 'admin']).defaultTo('user').notNullable();
    table.string('password', 100).notNullable().unique();
    table.timestamp(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('users');
};
