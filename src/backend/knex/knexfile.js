require('babel-polyfill')
require('babel-register')

// when knexfile.js is in a subdir, knex automatically changes working directory
// revert this change
process.chdir('../')
module.exports = {
  client: 'pg',
  connection: {
    database: 'hiker',
    user: 'postgres',
    password: '',
    port: '5432',
    host: 'localhost',
  },
  debug: false,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: 'knex/migrations',
  },
  seeds: {
    directory: 'knex/seeds',
  },
}
