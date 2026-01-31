/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('categories', (table) => {
        table.string('id').primary();
        table.string('name', 125).notNullable();
        table.timestamp(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTableIfExists('categories');
};
