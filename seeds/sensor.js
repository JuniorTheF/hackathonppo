
exports.seed = async function(knex) {
  await knex('sensor').del()
  await knex('sensor').insert([
    {id: 1, sensor_id: 'rowValue1', coord_x: 1, coord_y: 2},
  ]);
};
