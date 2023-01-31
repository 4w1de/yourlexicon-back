/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('FEEDBACK', (table) => {
        table.increments('id');
        table.string('idUser').notNullable();
        table.string('message', 500).notNullable();
        table.integer('status').defaultTo(0);
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
        table.timestamp('dateUpdated').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('FEEDBACK');
};
