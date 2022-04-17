
exports.up = function(knex) {
    return knex.schema
    .createTable('data', function (table) {
      table.increments('id');
      table.string('swan_id', 255).notNullable()
      table.string('sensor_id', 255).notNullable()
      table.decimal('rate', 8).notNullable()
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('data')
};
