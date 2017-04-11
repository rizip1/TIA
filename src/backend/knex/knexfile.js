require('babel-polyfill')
require('babel-register')

// when knexfile.js is in a subdir, knex automatically changes working directory
// revert this change

let connection = {
  database: 'hiker',
  user: 'postgres',
  password: '',
  port: '5432',
  host: 'localhost',
}
if (process.env.NODE_ENV) {
  connection = process.env.DATABASE_URL
}

process.chdir('../')
module.exports = {
  client: 'pg',
  connection,
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
