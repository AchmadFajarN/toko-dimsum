/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
    return knex.schema.createTable('product_categories', (table) => {
        table.string('product_id', 125).notNullable().references('id').inTable('products').onDelete('CASCADE');
        table.string('category_id', 125).notNullable().references('id').inTable('categories').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
    return knex.schema.dropTableIfExists('product_categories');
};
