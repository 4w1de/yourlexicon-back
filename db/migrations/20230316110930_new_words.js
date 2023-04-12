/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('NEW_WORDS', (table) => {
        table.increments('id');
        table.string('engWord').notNullable().unique();
        table.string('rusWord').notNullable();
        table.string('fakeWords').notNullable();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
        table.timestamp('dateUpdated').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable('NEW_WORDS');
};
