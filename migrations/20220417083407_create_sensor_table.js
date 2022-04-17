
exports.up = function(knex) {
    return knex.schema
    .createTable('sensor', function (table) {
      table.increments('id');
      table.string('sensor_id', 255).notNullable().unique()
      table.integer('coord_x', 255).notNullable()
      table.integer('coord_y', 255).notNullable()
    });
};


exports.down = function(knex) {
    return knex.schema
    .dropTable('sensor');
};
