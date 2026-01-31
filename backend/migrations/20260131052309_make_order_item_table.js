/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema.createTable('order_items', (table) => {
        table.string('id', 125).primary();
        table.string('order_id', 125).notNullable().references('id').inTable('orders').onDelete('CASCADE');
        table.string('product_id', 125).notNullable().references('id').inTable('products').onDelete('CASCADE');
        table.integer('qnty').notNullable().defaultTo(1);
        table.decimal('price', 12, 2).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('order_items');
};
