/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('USERS', (table) => {
        table.increments('id');
        table.string('userName').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable().unique();
        table.string('firstName');
        table.string('lastName');
        table.integer('role').notNullable().defaultTo(2);
        table.text('arrayWords');
        table.text('arrayFavoriteWords');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.createTable('USERS');
};
