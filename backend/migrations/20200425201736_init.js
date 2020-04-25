/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    table.uuid('uuid').primary().defaultTo(knex.raw('UUID()'));
    table.string('username').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};
