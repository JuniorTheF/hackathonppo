
exports.seed = async function(knex) {
  await knex('data').del()
  await knex('data').insert([
    {id: 1, swan_id: 'rowValue1', sensor_id: 'ergdfgd', rate: 0.23453},
  ]);
};
