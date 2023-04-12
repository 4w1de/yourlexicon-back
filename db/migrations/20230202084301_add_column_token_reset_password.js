/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('USERS', (table) => {
        table.string('tokenResetPassword');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('USERS', (table) => {
        table.dropColumn('tokenResetPassword');
    });
};
