module.exports =  {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5433,
    user : 'postgres',
    password : 's',
    database : 'postgres'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory:  './migrations'
  },
  useNullAsDefault: true

};