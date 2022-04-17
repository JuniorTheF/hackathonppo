
exports.seed = async function(knex) {
  await knex('sensor').del()
  await knex('sensor').insert([
    {id: 1, sensor_id: 'fghfdhg', coord_x: 1, coord_y: 2},
  ]);
};
