/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema.createTable('orders', (table) => {
        table.string('id', 125).primary();
        table.string('user_id', 125).notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.decimal('total_price', 12, 2).notNullable();
        table.enu('status', ['pending', 'paid', 'shipped', 'done', 'cancelled']).notNullable().defaultTo('pending');
        table.timestamp(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTable('orders');
};
