/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('WORDS', (table) => {
        table.increments('id');
        table.string('engWord').notNullable().unique();
        table.string('rusWord').notNullable().unique();
        table.string('fakeRusWord1').notNullable();
        table.string('fakeRusWord2').notNullable();
        table.string('fakeRusWord3').notNullable();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
        table.timestamp('dateUpdated').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('WORDS');
};
