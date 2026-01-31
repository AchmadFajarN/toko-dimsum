/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('products', (table) => {
        table.string('id', 36).primary();
        table.string('name', 100).notNullable();
        table.string('description', 500).nullable();
        table.decimal('price', 12, 2).notNullable();
        table.integer('stock').notNullable().defaultTo(1);
        table.string('img_url', 255).nullable();
        table.boolean('is_active').defaultTo(false).notNullable();
        table.timestamp(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTableIfExists('products');
};
